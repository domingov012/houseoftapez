import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Faq({title, answer}) {
  return (
    <div className="faq-section last">
      <div className="drop-down-faq w-full">
        <h3>{title}</h3>
        <FontAwesomeIcon icon={faPlus} className="mr-4 text-xl" />
        <div className="faq-item big-item overflow-auto">
          <div className="faq-answer text-white text-font">{answer}</div>
        </div>
      </div>
    </div>
  );
}
