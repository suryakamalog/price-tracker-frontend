import useInput from "../hooks/use-input";
import { useState } from "react";
import axios from "../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
const NewProduct = () => {
  const [enteredWebsite, setEnteredWebsite] = useState("");
  const access_token = useSelector((state) => state.auth.access_token);
  const navigate = useNavigate();

  const {
    value: enteredproductLink,
    isValid: enteredProductLinkIsValid,
    hasError: productLinkInputHasError,
    valueChangeHandler: productLinkChangeHandler,
    inputBlurHandler: productLinkBlurHandler,
    reset: resetProdutLinkInput,
  } = useInput((value) => value.trim() !== "");

  const formSubmissionHandler = async (event) => {
    event.preventDefault();


    if (!enteredProductLinkIsValid || enteredWebsite === "") {
      return;
    }

    try {

      const response = await axios.post(
        "/api/add_product/",
        JSON.stringify({
          url: enteredproductLink,
          website: enteredWebsite
        }),
        {
          headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${access_token}`},
          withCredentials: true,
        }
      );
      navigate('/productlist')
    }
    catch(e) {
      console.log(e)
    }

    resetProdutLinkInput();
  };

  const changeEnteredWebsite = (e) => {
    setEnteredWebsite(e.target.value);
  };

  return (
    <div className="container-sm">
      <form onSubmit={formSubmissionHandler}>
        <div className="mb-3">
          <label className="form-label">Product Link</label>
          <input
            type="product-link"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Product Link"
            onChange={productLinkChangeHandler}
            onBlur={productLinkBlurHandler}
            value={enteredproductLink}
          />
          {productLinkInputHasError && (
            <p className="text-danger">Product link must not be empty.</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="inputWebsite">Website</label>
          <select
            id="inputWebsite"
            className="form-control"
            value={enteredWebsite}
            onChange={changeEnteredWebsite}
          >
            <option value={null} defaultValue>
              Choose...
            </option>
            <option value="amazon">Amazon</option>
            <option value="flipkart">Flipkart</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
