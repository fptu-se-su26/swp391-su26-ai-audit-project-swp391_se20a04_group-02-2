import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Filter,
  Search,
  ShoppingCart,
} from "lucide-react";
import "./ProductsPage.css";

function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] =
    useState(categoryParam);

  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "rau-cu", name: "Rau củ" },
    { id: "trai-cay", name: "Trái cây" },
    { id: "dac-san", name: "Đặc sản" },
    { id: "huu-co", name: "Hữu cơ" },
  ];

  const allProducts = [
    {
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
      reviews: 245,
      category: "rau-cu",
    },
    {
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
      reviews: 189,
      category: "trai-cay",
    },
    {
      id: 3,
      name: "Gạo ST25",
      price: 180000,
      originalPrice: null,
      location: "Sóc Trăng",
      image:
        "https://cdn.tgdd.vn/2020/12/CookProduct/9-1200x676.jpg",
      badge: null,
      badgeColor: null,
      rating: 5,
      reviews: 412,
      category: "dac-san",
    },
    {
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
      reviews: 178,
      category: "trai-cay",
    },
    {
      id: 5,
      name: "Cà chua Hải Dương",
      price: 58000,
      originalPrice: 65000,
      location: "Hải Dương",
      image:
        "https://cdn.tgdd.vn/Files/2017/10/30/1037058/9-cong-dung-va-han-che-cua-ca-chua-doi-voi-cuoc-song-hang-ngay-202103142026330054.jpg",
      badge: "MỚI",
      badgeColor: "bg-blue-500",
      rating: 4.8,
      reviews: 156,
      category: "rau-cu",
    },
    {
      id: 6,
      name: "Cải bó xôi Đà Lạt",
      price: 32000,
      originalPrice: null,
      location: "Đà Lạt",
      image:
        "https://bizweb.dktcdn.net/thumb/grande/100/390/808/products/20190405141327hat-giong-cai-bo-xoi.jpg?v=1593856342497",
      badge: null,
      badgeColor: null,
      rating: 4.9,
      reviews: 234,
      category: "rau-cu",
    },
    {
      id: 7,
      name: "Nấm hương Lâm Đồng",
      price: 75000,
      originalPrice: 85000,
      location: "Lâm Đồng",
      image:
        "https://daknong.1cdn.vn/2021/02/17/baolamdong.vn-file-e7837c02845ffd04018473e6df282e92-dataimages-202102-original-_images2346922_t521.jpg",
      badge: "BÁN CHẠY",
      badgeColor: "bg-red-500",
      rating: 5,
      reviews: 289,
      category: "huu-co",
    },
    {
      id: 8,
      name: "Mâm xôi xanh loại I",
      price: 89000,
      originalPrice: null,
      location: "Đà Lạt",
      image:
        "https://www.vinmec.com/static/uploads/medium_20220101_133034_819571_cay_mam_xoi_2_max_1800x1800_jpg_23bb935ca6.jpg",
      badge: null,
      badgeColor: null,
      rating: 5,
      reviews: 145,
      category: "trai-cay",
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter(
          (p) => p.category === selectedCategory
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "popular") return b.reviews - a.reviews;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="products-page">
      {/* NAVBAR */}
      <header className="top-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-left">
            <h1
              className="logo"
              onClick={() => navigate("/")}
            >
              PreOnic
            </h1>
          </div>

          {/* Menu */}
          <nav className="navbar-links">
            <button onClick={() => navigate("/")}>
              Trang Chủ
            </button>

            <button
              className="active-link"
              onClick={() => navigate("/products")}
            >
              Sản Phẩm
            </button>

            <button>Farmers</button>

            <button>About</button>
          </nav>

          {/* Right */}
          <div className="navbar-right">
            <div className="search-box">
              <Search size={18} color="#666" />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
              />
            </div>

            <button className="icon-btn">
              <ShoppingCart size={18} />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="signin-btn"
            >
              Đăng nhập
            </button>

            <button
              className="avatar-btn"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="avatar"
              />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="products-main">
        {/* Title */}
        <div className="products-title-section">
          <h2 className="products-page-title">
            {selectedCategory === "all"
              ? "Rau củ tươi sạch"
              : selectedCategory === "rau-cu"
              ? "Rau củ"
              : selectedCategory === "trai-cay"
              ? "Trái cây"
              : selectedCategory === "dac-san"
              ? "Đặc sản địa phương"
              : selectedCategory === "huu-co"
              ? "Thực phẩm hữu cơ"
              : "Sản phẩm"}
          </h2>

          <p className="products-page-description">
            Khám phá những sản phẩm tươi sạch từ các nông
            dân uy tín trên toàn quốc
          </p>
        </div>

        <div className="products-layout-grid">
          {/* SIDEBAR */}
          <div className="products-sidebar">
            <div className="products-filter-box">
              {/* Categories */}
              <div>
                <h3>
                  <Filter size={18} />
                  Bộ lọc
                </h3>

                {categories.map((cat) => (
                  <label key={cat.id}>
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={(e) =>
                        setSelectedCategory(e.target.value)
                      }
                    />

                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>

              {/* Price */}
              <div>
                <h4>Giá</h4>

                <label>
                  <input type="checkbox" />
                  <span>Dưới 50.000đ</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span>50.000đ - 100.000đ</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span>Trên 100.000đ</span>
                </label>
              </div>

              {/* Rating */}
              <div>
                <h4>Đánh giá</h4>

                {[5, 4, 3].map((stars) => (
                  <label key={stars}>
                    <input type="checkbox" />

                    <div className="products-rating-stars">
                      {Array(stars)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                    </div>

                    <span>{stars} sao trở lên</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="products-main-content">
            {/* Sort */}
            <div className="products-sort-bar">
              <span className="products-count">
                Hiển thị{" "}
                <strong>
                  {sortedProducts.length}
                </strong>{" "}
                sản phẩm
              </span>

              <select
                className="products-sort-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option value="popular">
                  Phổ biến nhất
                </option>

                <option value="price-low">
                  Giá thấp đến cao
                </option>

                <option value="price-high">
                  Giá cao đến thấp
                </option>
              </select>
            </div>

            {/* Products */}
            <div className="products-grid">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="products-card"
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                >
                  {/* Image */}
                  <div className="products-card-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="products-card-img"
                    />

                    {product.badge && (
                      <div
                        className={`products-card-badge ${product.badgeColor}`}
                      >
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="products-card-content">
                    <h3 className="products-card-name">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="products-card-rating">
                      <div className="products-rating-stars">
                        {Array(
                          Math.floor(product.rating)
                        )
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                      </div>

                      <span className="products-rating-text">
                        {product.rating} (
                        {product.reviews} đánh giá)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="products-card-price">
                      <span className="products-price-current">
                        {product.price.toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>

                      {product.originalPrice && (
                        <span className="products-price-original">
                          {product.originalPrice.toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="products-card-location">
                      <MapPin size={12} />
                      {product.location}
                    </div>

                    {/* Button */}
                    <button className="products-card-button">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty */}
            {sortedProducts.length === 0 && (
              <div className="products-empty-state">
                Không tìm thấy sản phẩm nào
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;