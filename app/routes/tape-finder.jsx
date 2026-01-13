import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState} from 'react';
import TapeFinderQuiz from '~/components/tape-finder/TapeFinderQuiz';
import QuizResults from '~/components/tape-finder/QuizResults';
import {
  questions,
  quizFlow,
  earlyExitConditions,
  skipConditions,
} from '~/data/tapeFinderQuestions';

export const meta = () => {
  return [{title: 'Tape Finder | HOUSE OF TAPEZ'}];
};

export async function loader({context}) {
  const {storefront} = context;
  const {tapes, packs} = await storefront.query(TAPE_FINDER_PRODUCTS_QUERY);
  return json({products: tapes.nodes, packs: packs.nodes});
}

// Helper to parse metafields array into object
function parseMetafields(metafields) {
  const result = {};
  metafields?.forEach((mf) => {
    if (mf?.key && mf?.value) {
      try {
        result[mf.key] = JSON.parse(mf.value);
      } catch {
        result[mf.key] = mf.value;
      }
    }
  });
  return result;
}

// Get weighted score from product's scoring metafield
// Returns the score for a specific answer, or defaultScore if not defined
function getWeightedScore(scoring, category, answerValue, defaultScore = 1) {
  if (!scoring || !scoring[category]) return defaultScore;
  return scoring[category][answerValue] ?? defaultScore;
}

function findMatchingProducts(products, answers) {
  // If purpose is 'otro', recommend general/utility tapes
  const isOtroUse = answers.purpose === 'otro';

  return products
    .filter((product) => {
      const mf = parseMetafields(product.metafields);

      // STRICT: Must match selected sport
      if (!mf.sport?.includes(answers.sport)) {
        return false;
      }

      // STRICT: Must match selected body part (only for injury flow)
      if (!isOtroUse && !mf.body_parts?.includes(answers.body_part)) {
        return false;
      }

      // STRICT: Must match selected injury category (only for injury flow)
      if (!isOtroUse && !mf.injury_category?.includes(answers.injury_category)) {
        return false;
      }

      return true;
    })
    .map((product) => {
      const mf = parseMetafields(product.metafields);
      const scoring = mf.scoring || {};
      let score = 0;

      // Sport score (from scoring metafield, default 1 if passed filter)
      score += getWeightedScore(scoring, 'sport', answers.sport, 1);

      // Purpose score
      if (mf.purpose?.includes(answers.purpose)) {
        score += getWeightedScore(scoring, 'purpose', answers.purpose, 2);
      }

      // Only check injury/body/support if not 'otro' use
      if (!isOtroUse) {
        // Injury category score
        score += getWeightedScore(scoring, 'injury_category', answers.injury_category, 1);

        // Body part score
        score += getWeightedScore(scoring, 'body_part', answers.body_part, 1);

        // Support level score
        const isMuscular = answers.injury_category === 'muscular';
        const supportAnswer = isMuscular ? 'elastico' : answers.support_level;

        if (supportAnswer !== 'no_se') {
          if (mf.support_level?.includes(supportAnswer)) {
            score += getWeightedScore(scoring, 'support_level', supportAnswer, 2);
          }
        } else {
          // 'no_se' - give a base score
          score += 1;
        }
      }

      return {...product, score};
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// Find packs that contain a specific product
function findPacksWithProduct(packs, productId) {
  return packs.filter((pack) => {
    const packProductsMf = pack.metafields?.find(
      (mf) => mf?.key === 'pack_products',
    );
    if (!packProductsMf?.value) return false;

    try {
      // The metafield value is a JSON array of product GIDs
      const includedProducts = JSON.parse(packProductsMf.value);
      return includedProducts.includes(productId);
    } catch {
      return false;
    }
  });
}

export default function TapeFinder() {
  const {products, packs} = useLoaderData();
  const [step, setStep] = useState(-1); // -1 = welcome screen
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestionId = quizFlow[step];
  const currentQuestion = questions[currentQuestionId];

  // Calculate total steps based on current answers
  // If purpose is 'otro', we only have 2 steps (sport + purpose)
  // If injury is 'muscular', we have 4 steps (skip support_level)
  // Otherwise, we have 5 steps (sport + purpose + injury + body + support)
  const getTotalSteps = () => {
    if (answers.purpose === 'otro') {
      return 2; // sport + purpose
    }
    if (answers.injury_category === 'muscular') {
      return 4; // sport + purpose + injury + body (skip support)
    }
    return quizFlow.length;
  };
  const totalSteps = getTotalSteps();

  const handleStart = () => {
    setStep(0);
  };

  const handleAnswer = (questionId, value) => {
    const newAnswers = {...answers, [questionId]: value};
    setAnswers(newAnswers);

    // Check for early exit condition
    const exitCondition = earlyExitConditions[questionId];
    if (exitCondition && value === exitCondition.value) {
      setShowResults(true);
      return;
    }

    // Determine next step
    let nextStep = step + 1;

    // Check if next question should be skipped
    const nextQuestionId = quizFlow[nextStep];
    const skipCondition = skipConditions[nextQuestionId];
    if (skipCondition && skipCondition.skipWhen(newAnswers)) {
      // Skip to results since support_level is the last question
      setShowResults(true);
      return;
    }

    if (nextStep < quizFlow.length) {
      setStep(nextStep);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else if (step === 0) {
      setStep(-1);
    }
  };

  const handleRestart = () => {
    setStep(-1);
    setAnswers({});
    setShowResults(false);
  };

  const results = showResults ? findMatchingProducts(products, answers) : [];
  const topResult = results[0] || null;
  const matchingPacks = topResult ? findPacksWithProduct(packs, topResult.id) : [];
  const otherResults = results.slice(1);

  return (
    <div className="tape-finder-container">
      {showResults ? (
        <QuizResults
          topResult={topResult}
          matchingPacks={matchingPacks}
          otherResults={otherResults}
          onRestart={handleRestart}
        />
      ) : (
        <TapeFinderQuiz
          step={step}
          totalSteps={totalSteps}
          currentQuestion={currentQuestion}
          answers={answers}
          onStart={handleStart}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

const TAPE_FINDER_PRODUCTS_QUERY = `#graphql
  query TapeFinderProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    tapes: products(first: 20, query: "tag:tape") {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        metafields(identifiers: [
          {namespace: "tape_finder", key: "sport"},
          {namespace: "tape_finder", key: "injury_category"},
          {namespace: "tape_finder", key: "body_parts"},
          {namespace: "tape_finder", key: "purpose"},
          {namespace: "tape_finder", key: "support_level"},
          {namespace: "tape_finder", key: "scoring"}
        ]) {
          key
          value
        }
        tags
      }
    }
    packs: products(first: 20, query: "tag:pack") {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "pack_products"}
        ]) {
          key
          value
        }
      }
    }
  }
`;
