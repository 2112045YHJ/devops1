import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../api/axiosInstance";
import type { ProductDTO } from "../types/product";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [list, setList] = useState<ProductDTO[]>([]);

  useEffect(() => {
    productApi
      .getList()
      .then((data) => setList(data))
      .catch(console.error);
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-title">상품 목록</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>번호</th>
            <th style={{ width: "15%" }}>이미지</th>
            <th style={{ width: "35%" }}>상품명</th>
            <th style={{ width: "20%" }}>가격</th>
            <th style={{ width: "20%" }}>수량</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((product) => (
              <tr key={product.num}>
                <td>{product.num}</td>
                <td>
                  {product.storedFilePath ? (
                    <img 
                      src={product.storedFilePath} 
                      alt={product.name} 
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} 
                    />
                  ) : (
                    <div style={{ width: "50px", height: "50px", backgroundColor: "#eee", borderRadius: "4px", display: "inline-block", lineHeight: "50px", fontSize: "10px", color: "#999" }}>NO IMG</div>
                  )}
                </td>
                <td style={{ textAlign: "left" }}>
                  <Link className="title-link" to={`/product/${product.num}`}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.price.toLocaleString()}원</td>
                <td>{product.amount}개</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>등록된 상품이 존재하지 않습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="btn-area">
        <Link to={"/insert"}>
          <button className="btn-write">상품 등록</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
