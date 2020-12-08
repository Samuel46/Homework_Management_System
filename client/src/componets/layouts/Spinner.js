import React, { Fragment } from 'react';


export default () => (
  <Fragment>
    <div class="card-body spinner__center">
      <div class="d-flex justify-content-center mt-5 ">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>


      </div>

    </div>
    {/* <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    /> */}
  </Fragment>
);

