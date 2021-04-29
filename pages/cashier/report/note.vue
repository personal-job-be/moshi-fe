<template>
  <div class="title is-6">
    <div class="ticket">
            
      <p class="title is-4 centered">RECEIPT EXAMPLE
          <br>Address line 1
          <br>Address line 2
      </p>
      <table>
          <thead>
              <tr>
                  <th class="quantity">Q.</th>
                  <th class="description">Description</th>
                  <th class="price">$$</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td class="quantity">1.00</td>
                  <td class="description">ARDUINO UNO R3</td>
                  <td class="price">$25.00</td>
              </tr>
              <tr>
                  <td class="quantity">2.00</td>
                  <td class="description">JAVASCRIPT BOOK</td>
                  <td class="price">$10.00</td>
              </tr>
              <tr>
                  <td class="quantity">1.00</td>
                  <td class="description">STICKER PACK</td>
                  <td class="price">$10.00</td>
              </tr>
              <tr>
                  <td class="quantity"></td>
                  <td class="description">TOTAL</td>
                  <td class="price">$55.00</td>
              </tr>
          </tbody>
      </table>
      <p class="centered">Thanks for your purchase!
          <br>parzibyte.me/blog</p>
    </div>
  </div>
</template>

<script>

  export default {
    mounted () {
      window.print();
    },
    layout:"blank"
  }
</script>

<style  scoped>
    @page { size: 58mm 100mm } /* output size */
    body.receipt .sheet { width: 58mm; height: 100mm } /* sheet size */
    @media print { body.receipt { width: 58mm } } /* fix for Chrome */
</style>