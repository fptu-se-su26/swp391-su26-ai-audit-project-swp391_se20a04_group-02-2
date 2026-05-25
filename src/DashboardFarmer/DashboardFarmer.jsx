import "./DashboardFarmer.css";
import { useNavigate } from "react-router-dom";

function DashboardFarmer() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-farmer">
      {/* TOP NAVBAR */}
      <nav className="top-navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <h1
              className="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              PreOnic
            </h1>

            <div className="navbar-links">
              <button onClick={() => navigate("/")}>Trang Chủ</button>

              <button onClick={() => navigate("/products")}>Sản Phẩm</button>

              <button>About</button>

              <button className="active-link">Farmers</button>
            </div>
          </div>

          <div className="navbar-right">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>

              <input type="text" placeholder="Tìm kiếm nông sản..." />
            </div>

            <button className="icon-btn">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>

            <button className="icon-btn">
              <span className="material-symbols-outlined">account_circle</span>
            </button>

            <button className="signin-btn">Sign In</button>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div className="dashboard-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-menu">
            {/* DASHBOARD */}
            <button
              className="sidebar-item active"
              onClick={() => navigate("/dashboard")}
            >
              <span className="material-symbols-outlined">dashboard</span>
              Tổng quan
            </button>

            {/* PRODUCT FARMER */}
            <button
              className="sidebar-item"
              onClick={() => navigate("/farmer-products")}
            >
              <span className="material-symbols-outlined">inventory_2</span>
              Sản phẩm của tôi
            </button>

            {/* ORDERS */}
            <button className="sidebar-item">
              <span className="material-symbols-outlined">shopping_basket</span>
              Đơn hàng mới
            </button>

            {/* REVENUE */}
            <button className="sidebar-item">
              <span className="material-symbols-outlined">payments</span>
              Doanh thu
            </button>

            {/* SHOP SETTINGS */}
            <button className="sidebar-item">
              <span className="material-symbols-outlined">storefront</span>
              Cài đặt gian hàng
            </button>

            {/* SUPPORT */}
            <button className="sidebar-item">
              <span className="material-symbols-outlined">help</span>
              Hỗ trợ
            </button>
          </div>

          {/* FARMER CARD */}
          <div className="farmer-card">
            <div className="avatar">N</div>

            <div>
              <h4>Nông trại Xanh</h4>
              <p>Cấp độ: Chuyên gia</p>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="dashboard-content">
          {/* HEADER */}
          <div className="dashboard-header">
            <div>
              <h1>Chào buổi sáng, Nông trại Xanh!</h1>

              <p>Hôm nay bạn có 3 đơn hàng mới cần xử lý.</p>
            </div>

            <button
              className="add-product-btn"
              onClick={() => navigate("/farmer-products")}
            >
              <span className="material-symbols-outlined">add</span>
              Thêm sản phẩm mới
            </button>
          </div>

          {/* STATS */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon green">
                <span className="material-symbols-outlined">
                  shopping_cart_checkout
                </span>
              </div>

              <h3>1,248</h3>
              <p>Tổng đơn hàng</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <span className="material-symbols-outlined">monitoring</span>
              </div>

              <h3>45,200,000đ</h3>
              <p>Doanh thu tháng này</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon dark">
                <span className="material-symbols-outlined">star_rate</span>
              </div>

              <h3>4.8 / 5.0</h3>
              <p>Đánh giá trung bình</p>
            </div>
          </section>

          {/* TABLE + ORDERS */}
          <div className="content-grid">
            {/* PRODUCTS */}
            <div className="products-section">
              <div className="section-header">
                <h2>Sản phẩm của tôi</h2>

                <button onClick={() => navigate("/farmer-products")}>
                  Xem tất cả
                </button>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Cà chua Organic</td>

                    <td>35.000đ/kg</td>

                    <td>
                      <span className="status available">Còn hàng</span>
                    </td>

                    <td>✏️ 🗑️</td>
                  </tr>

                  <tr>
                    <td>Xà lách thủy canh</td>

                    <td>28.000đ/cây</td>

                    <td>
                      <span className="status low">Sắp hết</span>
                    </td>

                    <td>✏️ 🗑️</td>
                  </tr>

                  <tr>
                    <td>Cà rốt Đà Lạt</td>

                    <td>42.000đ/kg</td>

                    <td>
                      <span className="status out">Hết hàng</span>
                    </td>

                    <td>✏️ 🗑️</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ORDERS */}
            <div className="orders-section">
              <h2>Đơn hàng mới</h2>

              <div className="order-card">
                <h4>#DH-8492</h4>

                <p>Lê Văn Nam</p>

                <span>3kg Cà chua, 2kg Xà lách...</span>

                <button>Xác nhận</button>
              </div>

              <div className="order-card">
                <h4>#DH-8490</h4>

                <p>Trần Thị Hoa</p>

                <span>5kg Gạo ST25, 1kg Mật ong...</span>

                <button>Xác nhận</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <div>
          <h2>PreOnic</h2>

          <p>Bridging the gap between soil and soul.</p>
        </div>

        <div>
          <h4>Khám phá</h4>

          <a href="/">About Us</a>

          <a href="/">Sustainability</a>
        </div>

        <div>
          <h4>Hỗ trợ</h4>

          <a href="/">FAQ</a>

          <a href="/">Contact</a>
        </div>

        <div>
          <h4>Bản tin</h4>

          <div className="newsletter">
            <input type="email" placeholder="Email của bạn" />

            <button>
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardFarmer;
