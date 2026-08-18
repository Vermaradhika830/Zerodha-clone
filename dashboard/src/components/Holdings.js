import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {

  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => {

        console.log("Holdings data:", res.data);

        setAllHoldings(res.data);

      })
      .catch((error) => {

        console.error("Holdings API Error:", error);

      });

  }, []);


  const labels = allHoldings.map(
    (stock) => stock.name
  );


  const data = {

    labels: labels,

    datasets: [
      {
        label: "Stock Price",

        data: allHoldings.map((stock) => {

          const price = Number(stock.price);

          return Number.isFinite(price)
            ? price
            : 0;

        }),

        backgroundColor:
          "rgba(255, 99, 132, 0.5)",

        borderColor:
          "rgba(255, 99, 132, 1)",

        borderWidth: 1,
      },
    ],
  };


  return (

    <>

      <h3 className="title">
        Holdings ({allHoldings.length})
      </h3>


      <div className="order-table">

        <table>

          <thead>

            <tr>

              <th>Instrument</th>

              <th>Qty.</th>

              <th>Avg. cost</th>

              <th>LTP</th>

              <th>Cur. val</th>

              <th>P&L</th>

              <th>Net chg.</th>

              <th>Day</th>

            </tr>

          </thead>


          <tbody>

            {allHoldings.map((stock, index) => {

              const curValue =
                Number(stock.price || 0) *
                Number(stock.qty || 0);


              const investment =
                Number(stock.avg || 0) *
                Number(stock.qty || 0);


              const profitLoss =
                curValue - investment;


              const profitClass =
                profitLoss >= 0
                  ? "profit"
                  : "loss";


              const dayClass =
                String(stock.day || "")
                  .includes("-")
                  ? "loss"
                  : "profit";


              return (

                <tr key={stock._id || index}>

                  <td>
                    {stock.name}
                  </td>


                  <td>
                    {stock.qty}
                  </td>


                  <td>
                    {Number(stock.avg || 0).toFixed(2)}
                  </td>


                  <td>
                    {Number(stock.price || 0).toFixed(2)}
                  </td>


                  <td>
                    {curValue.toFixed(2)}
                  </td>


                  <td className={profitClass}>

                    {profitLoss.toFixed(2)}

                  </td>


                  <td className={profitClass}>

                    {stock.net}

                  </td>


                  <td className={dayClass}>

                    {stock.day}

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>


      <div className="row">

        <div className="col">

          <h5>
            29,875.<span>55</span>
          </h5>

          <p>Total investment</p>

        </div>


        <div className="col">

          <h5>
            31,428.<span>95</span>
          </h5>

          <p>Current value</p>

        </div>


        <div className="col">

          <h5 className="profit">
            1,553.40 (+5.20%)
          </h5>

          <p>P&amp;L</p>

        </div>

      </div>


      <VerticalGraph data={data} />

    </>

  );
};


export default Holdings;
