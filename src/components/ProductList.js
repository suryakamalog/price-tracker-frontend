import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const ProductList = () => {
  // create two states for products so that the original one don't get overridden
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getAllProducts = async () => {
      try {
        const response = await axiosPrivate.get("/api/user_product_list/", {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (isMounted) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const deleteProductHandler = (id) => {
    const deleteProduct = async (id) => {
      try {
        console.log(id);
        const response = await axiosPrivate.delete(
          "/api/user_product/delete/",
          {
            data: {
              id: id,
            },

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(products.filter((product) => product.pk !== id));
      } catch (err) {
        console.log(err);
      }
    };
    deleteProduct(id);
  };

  const searchProductHandler = (e) => {
    const filtered = products.filter((product) => {
      if (e.target.value === "") {
        return product;
      } else {
        return product.fields.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }
    });
    setKeyword(e.target.value);
    setFilteredProducts(filtered);
  };

  return (
    <>
      <div className="container-sm">
        <div className="form-group m-3">
          <input
            type="product-name"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Product Name"
            value={keyword}
            onChange={searchProductHandler}
          />
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Website</th>
              <th scope="col">Name</th>
              <th scope="col">URL</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, key) => (
              <tr key={key}>
                <td>{product.fields.website}</td>
                <td>{`${product.fields.title.trim().slice(0, 50)} ...`}</td>
                <td>
                  <a href={product.fields.url}>{`${product.fields.url
                    .trim()
                    .slice(0, 50)} ...`}</a>
                </td>
                <td>{product.fields.price}</td>
                <td>
                  <button className="btn btn-secondary">Edit</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProductHandler(product.pk)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProductList;
