export const POSITION_ID_KEY = 'position_id';
export const OPEN_DATE_KEY = 'open_date';
export const TARGET_OFFER_DATE_KEY = 'offer_target_date';
export const RECRUITER_KEY = 'recruiter';
export const MAXIMUM_NUMBER_OF_POSITIONS = 20;
export const TARGET_DATE_DEFAULT_NUMBER_OF_DAYS = 45;

const POSITION_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  ON_HOLD: 'on_hold',
  DELETED: 'deleted',
  CANCELLED: 'cancelled',
  OFFER_ROLLED_OUT: 'offer_rolled_out',
  OFFER_ACCEPTED: 'offer_accepted',
  OFFERED: 'offered',
  JOINED: 'joined',
  OFFER_DECLINED: 'offer_declined',
  OFFER_REVOKED: 'offer_revoked',
  CANDIDATE_UNREACHABLE: 'candidate_unreachable',
  OFFER_NOT_EXTENDED: 'offer_not_extended',
  OFFER_REJECTED: 'offer_rejected',
};

export const CLOSED_POSITION_STATUSES = [
  POSITION_STATUS.CLOSED,
  POSITION_STATUS.JOINED,
  POSITION_STATUS.CANCELLED,
  POSITION_STATUS.OFFER_ACCEPTED,
  POSITION_STATUS.OFFERED,
  POSITION_STATUS.DELETED,
];
