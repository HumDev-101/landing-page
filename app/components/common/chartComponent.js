import React, { PureComponent } from 'react';
import { LineChart, AreaChart,Area,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default class ChartComponent extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
 
          data={this.props.plotData}
          margin={{
            top: 0,
            right: 0,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[parseFloat(this.props.plotData[0].coinPriceInUSDT*0.99).toFixed(2),parseFloat(this.props.plotData[this.props.plotData.length-1].coinPriceInUSDT*1.01).toFixed(2)]}/>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#27AE60" stopOpacity={0.35}/>
              <stop offset="100%" stopColor="#27AE60" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="coinPriceInUSDT" name="Coin Price in USDT"  stroke="#27AE60" fillOpacity={1} fill="url(#colorPv)" />

        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
