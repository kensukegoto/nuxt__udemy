import Vue from "vue";

const months = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月"
];

const dataFilter = value => {
  return formatData(value);
};

function formatData(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const formattedDate = `${year}年${months[month]}月${day}日`;
  return formattedDate;
}

Vue.filter("date",dataFilter);