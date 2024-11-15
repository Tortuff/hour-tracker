export function userModelToResponseDto(user) {
  return {
    // tenant: user.tenant.toString(),
    id: user._id.toString(),
    admin: user.admin,
    name: user.name,
    surname: user.surname,
    login: user.login,
  };
}
