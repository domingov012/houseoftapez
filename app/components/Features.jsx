import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faWind,
  faPersonRunning,
  faForwardFast,
  faDroplet,
  faShieldHalved,
  faSuitcase,
  faSquareCheck,
  faTape,
  faArrowsLeftRight,
  faHandScissors,
  faCircleCheck,
  faArrowsUpDownLeftRight,
  faMoneyBill1Wave,
  faFeather,
  faScissors,
  faLink,
  faSpider,
  faTarpDroplet,
  faSocks,
  faLayerGroup,
  faArrowsToCircle,
  faCircleExclamation,
  faXmark,
  faGears,
  faVirusSlash,
  faClockRotateLeft,
  faLemon,
  faCrosshairs,
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  'fa-shield-halved': faShieldHalved,
  'fa-wind': faWind,
  'fa-suitcase': faSuitcase,
  'fa-person-running': faPersonRunning,
  'fa-foward-fast': faForwardFast,
  'fa-droplet': faDroplet,
  'fa-square-check': faSquareCheck,
  'fa-tape': faTape,
  'fa-arrows-left-right': faArrowsLeftRight,
  'fa-hand-scissors': faHandScissors,
  'fa-circle-check': faCircleCheck,
  'fa-arrows-up-down-left-right': faArrowsUpDownLeftRight,
  'fa-money-bill-wave': faMoneyBill1Wave,
  'fa-feather': faFeather,
  'fa-scissors': faScissors,
  'fa-link': faLink,
  'fa-spider': faSpider,
  'fa-tarp-droplet': faTarpDroplet,
  'fa-socks': faSocks,
  'fa-layer-group': faLayerGroup,
  'fa-arrows-to-circle': faArrowsToCircle,
  'fa-circle-exclamation': faCircleExclamation,
  'fa-xmark': faXmark,
  'fa-gears': faGears,
  'fa-virus-slash': faVirusSlash,
  'fa-clock-rotate-left': faClockRotateLeft,
  'fa-lemon': faLemon,
  'fa-crosshairs': faCrosshairs,
};

export default function Feature({index, fields}) {
  const i = index % 2 === 0 ? 'par' : 'impar';
  return (
    <div className={`features-container-${i}`}>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl">
          <FontAwesomeIcon icon={icons[fields[2].value]} className="text-5xl" />
        </h1>
        <div className="text-xl mt-3 text-font">{fields[1].value}</div>
        <div className="text-sm mt-3 text-font">{fields[0].value}</div>
      </div>
    </div>
  );
}
