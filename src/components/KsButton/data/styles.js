/**
 * @description 按钮样式.
 * @author pkeros
 * @data 2017/4/26
 * @email pkeros@vip.qq.com
 */

// 普通按钮样式
export const normal = `
  /* 默认状态 */
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract {
    color: white;
    background: {{ colorNormal }};
  }
  /* hover 状态 */
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:hover {
    background: {{ colorHover }};
  }
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:hover {
    background: {{ colorNormal }};
  }
  /* active 状态 */
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:active {
    background: {{ colorActive }};
  }
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:active {
    background: {{ colorNormal }};
  }
`;

// 幽灵按钮样式
export const ghost = `
  /* 默认状态 */
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract {
    color: {{ colorNormal }};
    background: white;
    border: 1px solid {{ colorNormal }};
  }
  /* hover 状态 */
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:hover {
    color: {{ colorHover }};
    border: 1px solid {{ colorHover }};
  }
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:hover {
    color: {{ colorNormal }};
    border: 1px solid {{ colorNormal }};
  }
  /* active 状态 */
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:active {
    color: {{ colorActive }};
    border: 1px solid {{ colorActive }};
  }
  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:active {
    color: {{ colorNormal }};
    border: 1px solid {{ colorNormal }};
  }
`;
