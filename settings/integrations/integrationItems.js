import CALENDLY_ICON from 'src/web/ats/assets/icons/thirdParty/calendly.png';
import OUTLOOK_ICON from 'src/web/ats/assets/icons/thirdParty/outlook.png';
import DEFAULT_ICON from 'src/web/ats/assets/icons/thirdParty/default.png';

export const GET_ICON = (name) => ({
  calendly: CALENDLY_ICON,
  outlook: OUTLOOK_ICON,
})[name] || DEFAULT_ICON;

export const INTEGRATION_ITEMS = [
  {
    name: 'calendly',
    desc: 'Find the perfect meeting time with super easy online appointment scheduling software from Calendly.',
    icon: GET_ICON('calendly'),
  },
  {
    name: 'outlook',
    desc: 'Sync your email to get real-time notifications when a new candidate or a job is updated.',
    icon: GET_ICON('outlook'),
  },
];
