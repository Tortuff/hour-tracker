export function userModelToResponseDto(user) {
  return {
    id: user._id.toString(),
    tenant: user.tenant.toString(),
    admin: user.admin,
    name: user.name,
    surname: user.surname,
    login: user.login,
  };
}
