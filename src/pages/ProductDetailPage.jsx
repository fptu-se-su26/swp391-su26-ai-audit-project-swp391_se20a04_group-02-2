import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, MapPin, ArrowLeft, Heart } from "lucide-react";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sản phẩm mẫu - bạn nên lấy từ API hoặc props
  const products = {
    1: {
      id: 1,
      name: "Rau muống Organic",
      price: 25000,
      originalPrice: 30000,
      location: "Đà Lạt",
      image:
        "https://product.hstatic.net/200000477661/product/rau-muong-1_3efd60b9cfe343c081b1c3a0b5eeaec0_master.jpg",
      badge: "ĐỔI MỚI",
      badgeColor: "bg-orange-500",
      rating: 5,
      description:
        "Rau muống hữu cơ tươi sạch được trồng không sử dụng thuốc trừ sâu hoá học. Rau giàu dinh dưỡng, tốt cho sức khỏe.",
      categories: ["Rau sạch", "Rau hữu cơ", "Rau tươi"],
      seller: "Vườn rau Đà Lạt",
      sellerRating: 4.8,
      sellerReviews: 245,
      inStock: true,
      policies: [
        "🚚 Giao hàng nhanh 2-3 ngày",
        "♻️ Bảo đảm hàng tươi sạch",
        "✓ Đổi trả trong 7 ngày",
      ],
    },
    2: {
      id: 2,
      name: "Cam sành Tiền Giang",
      price: 45000,
      originalPrice: null,
      location: "Tiền Giang",
      image:
        "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/6/2/cam-sanh-1-1134-1685673156031-16856731562081411734272.jpg",
      badge: "BÁN CHẠY",
      badgeColor: "bg-red-500",
      rating: 5,
      description:
        "Cam sành tươi ngon từ vùng ven biển Tiền Giang. Cam chín tự nhiên, có múi to, ngọt, nước nhiều.",
      categories: ["Cam tươi", "Cam ngọt", "Hàng chất lượng cao"],
      seller: "Trang trại cam Tiền Giang",
      sellerRating: 4.9,
      sellerReviews: 189,
      inStock: true,
      policies: [
        "🚚 Giao hàng nhanh 1-2 ngày",
        "❄️ Bảo quản lạnh tiêu chuẩn",
        "✓ Đổi trả nếu không hài lòng",
      ],
    },
    3: {
      id: 3,
      name: "Gạo ST25",
      price: 180000,
      originalPrice: null,
      location: "Sóc Trăng",
      image: "https://cdn.tgdd.vn/2020/12/CookProduct/9-1200x676.jpg",
      badge: null,
      badgeColor: null,
      rating: 5,
      description:
        "Gạo ST25 Sóc Trăng được công nhận là gạo ngon nhất thế giới. Hạt dài, thơm, dẻo, ngon.",
      categories: ["Gạo hạng I", "Gạo thơm", "Sản phẩm tự hào"],
      seller: "Công ty lúa gạo Sóc Trăng",
      sellerRating: 4.7,
      sellerReviews: 412,
      inStock: true,
      policies: [
        "🚚 Giao hàng toàn quốc",
        "📦 Đóng gói cẩn thận",
        "✓ Bảo hành chất lượng",
      ],
    },
    4: {
      id: 4,
      name: "Dâu tây Đà Lạt",
      price: 120000,
      originalPrice: null,
      location: "Lâm Đồng",
      image:
        "https://storage.googleapis.com/onelife-public/blog.onelife.vn/2024/01/bc3a163d-dau-tay-da-lat.png",
      badge: null,
      badgeColor: null,
      rating: 5,
      description:
        "Dâu tây Đà Lạt tươi ngon, đỏ mọng, ngọt, không hư hỏng. Được thu hoạch sáng và gửi ngay.",
      categories: ["Trái cây tươi", "Dâu tây", "Dâu ngọt"],
      seller: "Vườn dâu Đà Lạt",
      sellerRating: 4.6,
      sellerReviews: 178,
      inStock: true,
      policies: [
        "🚚 Giao hàng 1 ngày",
        "🌡️ Bảo quản nhiệt độ thích hợp",
        "✓ Đổi trả 100%",
      ],
    },
  };

  const product = products[productId];

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="text-center py-20">
          <h2>Sản phẩm không tồn tại</h2>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleAddToCart = () => {
    alert(`Thêm ${quantity} sản phẩm vào giỏ hàng!`);
    // TODO: Add to cart logic
  };

  return (
    <div className="product-detail-container">
      {/* Header với nút quay lại */}
      <div className="product-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="product-detail-content">
        {/* Phần hình ảnh */}
        <div className="product-image-section">
          <div className="product-image-wrapper">
            {product.badge && (
              <div className={`product-badge ${product.badgeColor}`}>
                {product.badge}
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </div>

          {/* Hình ảnh bổ sung */}
          <div className="product-thumbnails">
            <img
              src={product.image}
              alt="thumbnail 1"
              className="thumbnail active"
            />
            <img src={product.image} alt="thumbnail 2" className="thumbnail" />
            <img src={product.image} alt="thumbnail 3" className="thumbnail" />
            <img src={product.image} alt="thumbnail 4" className="thumbnail" />
          </div>
        </div>

        {/* Phần thông tin sản phẩm - Cột phải */}
        <div className="product-info-section">
          {/* Tên và rating */}
          <div className="product-header-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-rating">
              <div className="stars">
                {Array(product.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="star-icon"
                      fill="currentColor"
                    />
                  ))}
              </div>
              <span className="rating-text">5.0 (452 đánh giá)</span>
            </div>
          </div>

          {/* Giá */}
          <div className="product-price-section">
            <div className="price-display">
              <span className="current-price">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.originalPrice && (
                <>
                  <span className="original-price">
                    {product.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="discount-badge">
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Số lượng */}
          <div className="quantity-section">
            <label>Số lượng:</label>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="qty-input"
                min="1"
              />
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Nút hành động chính */}
          <div className="action-buttons-main">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={20} />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={20} />
            </button>
          </div>

          {/* Chính sách bảo - Orange Box */}
          {product.policies && product.policies.length > 0 && (
            <div className="policies-box">
              <h4>Giao hàng nhanh</h4>
              <ul className="policies-list">
                {product.policies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Thông tin người bán */}
          <div className="seller-info">
            <div className="seller-header">
              <h3>Người bán:</h3>
            </div>
            <div className="seller-details">
              <div className="seller-name">{product.seller}</div>
              <div className="seller-rating">
                <div className="stars-small">
                  {Array(Math.floor(product.sellerRating))
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="star-icon-small"
                        fill="currentColor"
                      />
                    ))}
                </div>
                <span className="seller-score">{product.sellerRating}</span>
                <span className="seller-reviews">
                  ({product.sellerReviews} đánh giá)
                </span>
              </div>
            </div>
          </div>

          {/* Địa điểm */}
          <div className="product-location">
            <MapPin size={16} />
            <span>Xuất xứ: {product.location}</span>
          </div>
        </div>
      </div>

      {/* Câu chuyện sản phẩm - Full width section */}
      <div className="product-story-section">
        <div className="story-content">
          <div className="story-left">
            <h2>Câu chuyện sản phẩm</h2>
            <p>{product.description}</p>
            <p>
              Thực 3 đơn hàng tặng khiếu kiếm trêu, ở đó hàng năm p tỉnh tưởng Ở
              bên là bạn đó ở của giỏ rau hoặc cách về độc tính xứ của khuyên ra
              khi chọn độ Bảo gì chắc chắn.
            </p>
          </div>
          <div className="story-image">
            <img src={product.image} alt="Product Story" />
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật - Table section */}
      <div className="specs-section">
        <h2>Thông số kỹ thuật</h2>
        <table className="specs-table">
          <tbody>
            <tr>
              <td className="spec-label">Thương hiệu</td>
              <td className="spec-value">Vườn rau sạch</td>
            </tr>
            <tr>
              <td className="spec-label">Xuất xứ</td>
              <td className="spec-value">Việt Nam</td>
            </tr>
            <tr>
              <td className="spec-label">Loại</td>
              <td className="spec-value">Rau sạch hữu cơ</td>
            </tr>
            <tr>
              <td className="spec-label">Trọng lượng</td>
              <td className="spec-value">1kg</td>
            </tr>
            <tr>
              <td className="spec-label">Bảo quản</td>
              <td className="spec-value">Dưới 5°C</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Đánh giá khách hàng - Reviews section */}
      <div className="reviews-section">
        <h2>Đánh giá khách hàng</h2>
        <div className="review-item">
          <div className="review-header">
            <span className="reviewer-name">Nguyễn Hoàng Anh</span>
            <span className="review-date">5 ngày trước</span>
          </div>
          <div className="review-rating">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="star-icon"
                  fill="currentColor"
                />
              ))}
          </div>
          <p className="review-text">
            Cam rất tươi, ngon, nhiều nước. Gửi rất nhanh. Sẽ mua lại!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <span className="reviewer-name">Lâm Minh</span>
            <span className="review-date">10 ngày trước</span>
          </div>
          <div className="review-rating">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="star-icon"
                  fill="currentColor"
                />
              ))}
          </div>
          <p className="review-text">
            Rau tươi, an toàn, chất lượng tốt. Mình mua cho cả nhà. Nhân viên
            giao hàng cũng rất tốt!
          </p>
        </div>
      </div>

      {/* Sản phẩm gợi ý */}
      <div className="related-products">
        <h2>Sản phẩm gợi ý</h2>
        <div className="related-products-grid">
          {Object.values(products)
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <div
                key={p.id}
                className="related-product-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img src={p.image} alt={p.name} />
                <h4>{p.name}</h4>
                <p className="related-price">
                  {p.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
