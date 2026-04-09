import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../api/axiosInstance";
import type { ProductDTO } from "../types/product";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (num) {
      productApi
        .getDetail(Number(num))
        .then((data) => setProduct(data))
        .catch(console.error);
    }
  }, [num]);

  const handleUpdate = async () => {
    if (!product) {
      return;
    }
    if (!product.name.trim()) {
      return alert("상품명을 입력해주세요.");
    }

    const formData = new FormData();
    formData.append("num", product.num.toString());
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("amount", product.amount.toString());
    if (file) {
      formData.append("uploadFile", file);
    }

    await productApi.update(formData as any);
    alert("수정완료");
    navigate("/");
  };

  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    await productApi.delete(Number(num));
    alert("삭제 완료");
    navigate("/");
  };

  if (!product) return <div className="detail-page">Loading...</div>;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>상품 상세 정보</h2>

        {product.storedFilePath && (
          <div className="product-image-container" style={{ textAlign: "center", marginBottom: "20px" }}>
            <img 
              src={product.storedFilePath} 
              alt={product.name} 
              style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "8px" }} 
            />
          </div>
        )}

        <div className="form-group">
          <label>상품명</label>
          <input
            key={`name-${num}`}
            className="input-field"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>가격</label>
          <input
            key={`price-${num}`}
            type="number"
            className="input-field"
            value={product.price || 0}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
          />
        </div>

        <div className="form-group">
          <label>수량</label>
          <input
            key={`amount-${num}`}
            type="number"
            className="input-field"
            value={product.amount || 0}
            onChange={(e) =>
              setProduct({ ...product, amount: Number(e.target.value) })
            }
          />
        </div>

        <div className="form-group">
          <label>이미지 변경</label>
          <input
            type="file"
            className="input-field"
            accept="image/*"
            style={{ padding: '8px' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="button-group">
          <button className="btn btn-list" onClick={() => navigate("/")}>
            목록으로
          </button>
          <button className="btn btn-update" onClick={handleUpdate}>
            수정완료
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
