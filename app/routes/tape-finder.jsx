import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState} from 'react';
import TapeFinderQuiz from '~/components/tape-finder/TapeFinderQuiz';
import QuizResults from '~/components/tape-finder/QuizResults';
import {questions, quizFlow} from '~/data/tapeFinderQuestions';

export const meta = () => {
  return [{title: 'Tape Finder | HOUSE OF TAPEZ'}];
};

export async function loader({context}) {
  const {storefront} = context;
  const {products} = await storefront.query(TAPE_FINDER_PRODUCTS_QUERY);
  return json({products: products.nodes});
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

function findMatchingProducts(products, answers) {
  return products
    .map((product) => {
      let score = 0;
      const mf = parseMetafields(product.metafields);

      // Injury category match (highest weight)
      if (mf.injury_category?.includes(answers.injury_category)) {
        score += 4;
      }

      // Body part match (high weight)
      if (mf.body_parts?.includes(answers.body_part)) {
        score += 3;
      }

      // Purpose match (medium weight)
      if (mf.purpose?.includes(answers.purpose)) {
        score += 2;
      }

      // Experience level match (low weight, bonus)
      if (mf.experience_level === answers.experience) {
        score += 1;
      }

      return {...product, score};
    })
    .filter((p) => p.score >= 3) // Must have some matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function TapeFinder() {
  const {products} = useLoaderData();
  const [step, setStep] = useState(-1); // -1 = welcome screen
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestionId = quizFlow[step];
  const currentQuestion = questions[currentQuestionId];
  const totalSteps = quizFlow.length;

  const handleStart = () => {
    setStep(0);
  };

  const handleAnswer = (questionId, value) => {
    const newAnswers = {...answers, [questionId]: value};
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
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

  return (
    <div className="tape-finder-container">
      {showResults ? (
        <QuizResults results={results} onRestart={handleRestart} />
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
    products(first: 20, query: "tag:tape") {
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
          {namespace: "tape_finder", key: "injury_category"},
          {namespace: "tape_finder", key: "body_parts"},
          {namespace: "tape_finder", key: "purpose"},
          {namespace: "tape_finder", key: "experience_level"}
        ]) {
          key
          value
        }
        tags
      }
    }
  }
`;
