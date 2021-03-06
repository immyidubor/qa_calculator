import { calculate } from "./calculate";

const CLEAR = "CLEAR";
const ENTER_NUMBER = "ENTER_NUMBER";
const EVALUATE = "EVALUATE";
const PERCENTAGE = "PERCENTAGE";
const SET_OPERATOR = "SET_OPERATOR";
const TOGGLE_NEGATIVE = "TOGGLE_NEGATIVE";

const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: 0,
  needNewValue: false,
};

export default function calculator(state = initialState, action) {
  switch (action.type) {
    case ENTER_NUMBER:
      return {
        ...state,
        currentValue:
          state.currentValue === "0" || state.needNewValue
            ? action.number.toString()
            : `${state.currentValue}${action.number}`,
        needNewValue: false,
      };
    case SET_OPERATOR:
      return {
        needNewValue: true,
        currentValue: state.previousValue,
        operator: action.operator,
        previousValue: state.operator
          ? calculate(
              parseFloat(state.currentValue),
              state.previousValue,
              state.operator
            )
          : parseFloat(state.currentValue),
      };
    case PERCENTAGE:
      return {
        ...state,
        currentValue: (parseFloat(state.currentValue) / 100).toString(),
      };
    case CLEAR:
      return {
        currentValue: "0",
        operator: null,
        previousValue: 0,
      };
    case EVALUATE:
      return {
        currentValue: calculate(
          parseFloat(state.currentValue),
          state.previousValue,
          state.operator
        ).toString(),
        operator: null,
        previousValue: 0,
        needNewValue: true,
      };
    case TOGGLE_NEGATIVE:
      return {
        ...state,
        currentValue: (-parseFloat(state.currentValue)).toString(),
      };
    default:
      return state;
  }
}

export function clear() {
  return { type: CLEAR };
}

export function enterNumber(number) {
  return { number, type: ENTER_NUMBER };
}

export function evaluate() {
  return { type: EVALUATE };
}

export function percentage() {
  return { type: PERCENTAGE };
}

export function setOperator(operator) {
  return { operator, type: SET_OPERATOR };
}

export function toggleNegative() {
  return { type: TOGGLE_NEGATIVE };
}
