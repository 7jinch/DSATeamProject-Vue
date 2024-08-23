// 유효성 검사용 패키지
const regEx = (type) => {
  let reg = null;

  if (type === 'email') {
    reg = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'); // email 정규표현식
  } else if (type === 'password') {
    reg = new RegExp('^.{6,12}$'); // password 정규표현식
  } else if (type === 'phoneNumber') {
    reg = new RegExp('^\\d{3}-\\d{4}-\\d{4}$'); // phoneNumber 정규표현식
  } else if (type === 'name') {
    reg = new RegExp('^[가-힣a-zA-Z0-9]{6,12}$'); // name 정규표현식
  }

  return reg;
};

export default regEx;
