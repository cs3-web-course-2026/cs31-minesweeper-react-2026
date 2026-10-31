import Indicator from './Indicator';

/**
 * Показує, скільки прапорців ще можна поставити.
 * @param {Object} props Властивості компонента.
 * @param {number} props.value Кількість доступних прапорців.
 * @returns {JSX.Element} Лічильник прапорців.
 */
function FlagCounter({ value }) {

  return <Indicator icon="🚩" label="Прапорці" value={value} variant="flags" isLive />;
}

export default FlagCounter;
