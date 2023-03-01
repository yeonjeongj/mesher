export const checkAmountInput = (val: string) => {
  let digit = 10;
  let regex = new RegExp('(\\.\\d{' + digit + '})\\d+', 'g');

  const digitLimit = val.replace(regex, '$1');
  const onlyNumber = digitLimit.replace(/[^0-9.]/g, '');
  const oneDotAllowed = onlyNumber.replace(/\.([.\d]+)$/, function (m, m1) {
    return '.' + m1.replace(/\./g, '');
  });

  // 0만 작성하는 경우 막기
  let blockOnlyZero = oneDotAllowed;
  if (oneDotAllowed.substring(0, 2) === '00') {
    blockOnlyZero = oneDotAllowed.replace('00', '0');
  }

  // 소수점이 없는 경우 앞 부분 0 삭제
  let result = blockOnlyZero;
  if (!blockOnlyZero.includes('.')) {
    let changeToNumber = Number(blockOnlyZero);
    result = changeToNumber.toString();
  } else if (
    blockOnlyZero.includes('.') &&
    blockOnlyZero.split('.')[1].length === digit
  ) {
    const arr = blockOnlyZero.split('.');
    let newArr: Array<string> = [];

    // 입력값 수정 시 0123.123과 같은 경우나 .123과 같은 상황 방지
    if (arr[0].length > 1 && arr[0].slice(0, 1) === '0') {
      newArr[0] = arr[0].slice(1);
    } else if (arr[0].length === 0) {
      newArr[0] = '0';
    } else {
      newArr[0] = arr[0];
    }

    // 소수점이 있는 경우 마지막 0 삭제
    for (let i = arr[1].length - 1; i >= 0; i--) {
      if (arr[1][i] === '0') {
        arr[1] = arr[1].substring(0, i);
        newArr[1] = arr[1];
      } else if (arr[1][i] !== '0') {
        newArr[1] = arr[1];
        break;
      }
    }

    // 0.0000과 같이 작성하는 경우 0으로 처리
    if (newArr[1].length !== 0) {
      result = newArr.join('.');
    } else {
      result = newArr[0];
    }
  }

  return result;
};

export const setDigitLimit = (val: number) => {
  let value = String(val);
  let digit = 10;
  let regex = new RegExp('(\\.\\d{' + digit + '})\\d+', 'g');
  const digitLimit = value.replace(regex, '$1');

  return Number(digitLimit);
};
