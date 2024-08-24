const NumOrStr = (str) => {
  const num = Number(str); // 숫자로 변환해보기
  if (!isNaN(num) && isFinite(num)) return num;
  else return null;
};

export default NumOrStr;
