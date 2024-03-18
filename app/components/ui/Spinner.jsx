import {faCircleNotch, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Spinner({h, w, color}) {
  return (
    <div>
      <FontAwesomeIcon className={`${color}`} icon={faCircleNotch} spin />
    </div>
  );
}
