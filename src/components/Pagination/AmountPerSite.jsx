import React from 'react';

export default function AmountPerSite({
  setAmountPerSite,
  setCurrentSite,
  options = [5, 10, 20, 30],
}) {
  return (
    <>
      <label className='form-control gap-2 w-fit'>
        <label htmlFor='results'>Results</label>
        <select
          id='results'
          className='select select-bordered focus:outline-none focus:border-primary'
          defaultValue='5'>
          {options.map((o) => (
            <option
              key={o}
              onClick={() => {
                setAmountPerSite(o);
                setCurrentSite(0);
              }}>
              {o}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
