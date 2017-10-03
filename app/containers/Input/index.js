import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

const Input = styled.input`
  height: 100px;
  width: 300px;
  background-color: #fff;
  border: deeppink 5px solid;
  line-height: 100px;
  text-align: center;
`;

const Shell = styled.div`
  text-align: center;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

export default class Index extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  _onFileDrop(e) {

    if (!e.target.files) {

      window.alert('No files object attached to target');

      return false;

    }

    if (!e.target.files.length) {

      window.alert('No files count in target array');

      return false;

    }

    const droppedFile = e.target.files[0];

    if (droppedFile.name.split('.')[1] !== 'csv') return window.alert('File must be csv foooooooooooo');

    Papa.parse(e.target.files[0], {

      complete: (results) => {

        if (!results.data || !results.data.length) {

          window.alert('Could not parse file, GODDAMMMN IT');

          return false;

        }

        results.data.shift();

        const newFile = [
          [
            'Reference Number (Required)',
            'Order Date (MM/DD/YYYY)',
            'Email (Required)',
            'First Name (Required)',
            'Last Name (Required)',
            'Phone Number (XXX-XXX-XXXX)',
            'Shipping Address 1',
            'Shipping Address 2',
            'Shipping City',
            'Shipping State',
            'Shipping Postal Code',
            'Shipping Country',
            'Billing Address 1',
            'Billing Address 2',
            'Billing City',
            'Billing State',
            'Billing Postal Code',
            'Billing Country',
            'Shipping and Handling',
            'Shipping Cost',
            'Ship Date (MM/DD/YYYY)',
            'Cancel Date (MM/DD/YYYY)',
            'Currency ISO (e.g.: USD)',
            'Tags (Comma Separated)',
            'Notes',
            'Item SKU (Required)',
            'Item Quantity (Required)',
            'Item Price (Required)',
            'Item Taxable (Y/N)',
            'Tax Rate',
          ],
        ];

        results.data.forEach((row) => {

          if (row.length < 29) return;

          newFile.push([
            row[3].toUpperCase(), // orderId
            row[2], // Order Date
            'geoff@offlineinc.com', // email
            row[4], // first name
            row[4], // last name
            row[11], // phone number
            row[18], // shipping address 1
            '', // shipping address 2
            row[19], // shipping city
            row[20], // shipping state
            row[21], // shipping postal code
            row[22], // shipping country
            row[13], // billing address 1
            '', // billing address 2
            row[14], // billing city
            row[15], // billing state
            row[16], // billing postal code
            row[17], // billing country
            '', // shipping and handling
            '', // shipping cost
            row[8], // ship date
            '', // cancel date
            'USD', // currency
            'FashionGo', // tags
            'Import from fashion go', // notes
            row[24], // sku
            row[28], // quantity
            row[29], // price
            'N', // taxable
            0, // tax rate
          ]);

        });

        const csv = Papa.unparse(newFile);

        const blob = new Blob([csv], { type: 'octet/stream' }),

          url = window.URL.createObjectURL(blob),
          a = document.createElement('a');

        document.body.appendChild(a);

        a.href = url;
        a.download = `stitchLabs - ${new Date()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        // console.log('Finished:', newFile);

        return false;

      },

    });

    return false;

  }

  render() {

    return (

      <Shell>

        <Input type="file" onChange={(e) => this._onFileDrop(e)} placeholder="DROP FILE" accept="*.csv" />

      </Shell>

    );

  }

}
