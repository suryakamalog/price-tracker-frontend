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
    }
      getAllProducts();
      return () => {
        isMounted = false;
        controller.abort();
      };
    
  });
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
                <td>{product.fields.url}</td>
                <td>{product.fields.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProductList;
