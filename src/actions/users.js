export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers (user) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}
