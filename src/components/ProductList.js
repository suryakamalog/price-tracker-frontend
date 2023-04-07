import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const ProductList = () => {
  const [products, setProducts] = useState([]);
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
        isMounted && setProducts(response.data.data);
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
              "id": id,
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
  return (
    <>
      <div className="container-sm">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Website</th>
              <th scope="col">URL</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, key) => (
              <tr key={key}>
                <td>{product.fields.website}</td>
                <td>
                  <a href={product.fields.url}>{product.fields.url}</a>
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
