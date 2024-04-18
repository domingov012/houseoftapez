import {Money} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {useState} from 'react';

export default function Ahorros({ahorro_array, price}) {
  let sum = 0;
  return (
    <div className="grid grid-cols-2 w-3/4 self-center mt-10">
      {ahorro_array.map((field) => {
        sum += field.price * field.quantity;
        return (
          <>
            <div className="compare-grid-item text-font">
              {field.quantity}x {field.product}
            </div>
            <Money
              className="compare-grid-item text-font"
              data={{
                amount: (field.price * field.quantity).toString(),
                currencyCode: 'CLP',
              }}
            />
          </>
        );
      })}
      <div className="compare-grid-item text-font">TOTAL:</div>
      <Money
        className="compare-grid-item text-font discounted-price-true"
        data={{amount: sum.toString(), currencyCode: 'CLP'}}
      />
      <div className="compare-grid-item text-font text-[#e5d201] font-black">
        {' '}
        PRECIO PACK:{' '}
      </div>
      <Money
        className="compare-grid-item text-font text-[#e5d201] font-black"
        data={price}
      />
    </div>
  );
}
