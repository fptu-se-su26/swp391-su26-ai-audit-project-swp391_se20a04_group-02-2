import "./productFarmer.css";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Wallet,
  Settings,
  Bell,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  TrendingUp,
  AlertTriangle,
  Boxes,
} from "lucide-react";

function ProductFarmer() {
  const products = [
    {
      id: 1,
      name: "Bông cải xanh hữu cơ",
      sku: "BCX-001",
      category: "Rau củ",
      price: "45,000đ",
      unit: "/kg",
      stock: "Còn hàng (120kg)",
      status: "available",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBvfEEhcQhp-z14JJSgAJkvn_CjOylxGBE-WGH6woYiTqy6_SHCyIsgU9-tn_gJJXxOYoWwR3-STDRqu-Nc91nZGEarlAEkAna7e0ZYSCLAmFA-1wG7UEshDuPRmidrYP7-AJbXLdcPZqE6M2NfwQbQFCOq9X8JqSpG_6S_EgwhzhaY_Fwx_WXakfOOn-7M0B1uEs-9f34DsTFcEI1S_omnwzaGrswSRBqVaOjJKpHRJ1lxFZe5W4mzisQfKm4Ig6-mKmlomNG0sZA",
    },
    {
      id: 2,
      name: "Cà chua Đà Lạt",
      sku: "CTD-042",
      category: "Rau củ",
      price: "32,000đ",
      unit: "/kg",
      stock: "Sắp hết (5kg)",
      status: "warning",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlpWJw9NIQygPL0W6ZDTUouEqQ_SxNvx06jK8LWxsH9VBpPBSh_lbP2S3-xHE5XK0auEsImb8luFdmqtOWwuwS6k70KIDkFTEXD-syW6skYZwlA8mtKQ3qDGf7uE1m_52dC7cgP6TWuBDzXQyehVbyO_yiOjfo_GJSTuLq77KAEhhu8-KK6y0eLvMeqj_A_Dn1bNk0b5-F5bx9lLnnRK2cxsCM6jQRhT9u6qHrpC28Tys2aLNUxS3ZgN7MkfYeyWcgs7m6o_v6wBo",
    },
    {
      id: 3,
      name: "Dứa mật Lâm Đồng",
      sku: "DML-009",
      category: "Trái cây",
      price: "58,000đ",
      unit: "/quả",
      stock: "Còn hàng (85 quả)",
      status: "available",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDoavieIxwOZ-dpTghjSn6IBk4SXgX9ISYQHorgiZ6fLFzpEphJBAQd8-79HHTRTVrSvVf46CDzPLG6QWIbP0FBPxTNLwRyVDY17W9mDZD2fM5ij_QNI9_u2kT9qm_85sS_PY9YFnjEV11YRCu7dFodiZbuqkmPOUBJe5EKnjBgQk79IP3IH1cDZmi4H_Ys7SNFPkNErthGJE3m6krC8OgvyAjT7kUjPdWicX9BK1MowmsZOZqu_NyHuoxjKeLOwZpFjZpE2CtKY8I",
    },
    {
      id: 4,
      name: "Quế thanh khô",
      sku: "QTK-112",
      category: "Gia vị",
      price: "120,000đ",
      unit: "/hộp",
      stock: "Hết hàng (0)",
      status: "error",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCEGt_eEP9QlZ3dfiHlBbm3A5j6ZI1TFclfmQB_jlNs5wu_VXFi8CXUws1zvyex0EL5CUiut-vwhp6b7AT-Md31g3YU0m6TX_iAd3muPuw7GGl8zjV48iJz6FV4tjov47kTXhRzVSod25TORwv15MmIhY-1YlUhJmJMh6a0XIyIq-wLxdIevZUIfiAMiWiXn5C3OeeiLatpGpUhoM7OQDlMrQlS5EXgGD76cUd-ECzEc9AWHvkmQsBONmRuhLoZGkrHeOP61egrdUk",
    },
  ];

  return (
    <div className="farmer-layout">
      {/* SIDEBAR */}
      <aside className="farmer-sidebar">
        <div className="sidebar-logo">
          <h1>PreOnic</h1>
        </div>

        <nav className="sidebar-menu">
          <Link to="/dashboard" className="sidebar-link">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/farmer-products" className="sidebar-link active">
            <Package size={18} />
            Sản phẩm của tôi
          </Link>

          <Link to="/" className="sidebar-link">
            <ShoppingBag size={18} />
            Đơn hàng
          </Link>

          <Link to="/" className="sidebar-link">
            <Wallet size={18} />
            Doanh thu
          </Link>

          <div className="sidebar-divider"></div>

          <Link to="/" className="sidebar-link">
            <Settings size={18} />
            Cài đặt
          </Link>
        </nav>

        <div className="farmer-account">
          <p className="account-label">TÀI KHOẢN FARMER</p>

          <div className="account-box">
            <div className="account-avatar">
              <User size={18} />
            </div>

            <div>
              <h4>Nông trại Xanh</h4>
              <p>Lâm Đồng, VN</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="farmer-main">
        {/* HEADER */}
        <header className="farmer-header">
          <h2>Sản phẩm của tôi</h2>

          <div className="header-actions">
            <button className="add-product-btn">
              <Plus size={18} />
              Thêm sản phẩm mới
            </button>

            <button className="notification-btn">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="farmer-content">
          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon green">
                <Boxes size={22} />
              </div>

              <p>Tổng sản phẩm</p>
              <h3>48</h3>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <AlertTriangle size={22} />
              </div>

              <p>Sắp hết hàng</p>
              <h3>05</h3>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <TrendingUp size={22} />
              </div>

              <p>Đang hoạt động</p>
              <h3>42</h3>
            </div>
          </div>

          {/* FILTER */}
          <div className="filter-box">
            <div className="search-input">
              <Search size={18} />

              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
              />
            </div>

            <select>
              <option>Tất cả danh mục</option>
              <option>Rau củ</option>
              <option>Trái cây</option>
            </select>

            <select>
              <option>Tất cả trạng thái</option>
              <option>Còn hàng</option>
              <option>Sắp hết</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>SẢN PHẨM</th>
                  <th>DANH MỤC</th>
                  <th>GIÁ</th>
                  <th>TỒN KHO</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info">
                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div>
                          <h4>{product.name}</h4>
                          <p>SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="category-badge">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      <div className="price">
                        {product.price}
                        <span>{product.unit}</span>
                      </div>
                    </td>

                    <td>
                      <div className={`stock ${product.status}`}>
                        <span className="dot"></span>
                        {product.stock}
                      </div>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button>
                          <Eye size={16} />
                        </button>

                        <button>
                          <Pencil size={16} />
                        </button>

                        <button className="delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="pagination">
              <p>
                Hiển thị <strong>1 - 4</strong> trong số
                <strong> 48 </strong> sản phẩm
              </p>

              <div className="pagination-buttons">
                <button>
                  <ChevronLeft size={18} />
                </button>

                <button className="active-page">1</button>

                <button>2</button>

                <button>3</button>

                <button>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="farmer-footer">
          <p>
            © 2024 PreOnic Agri-Tech. Bridging the gap between soil and soul.
          </p>

          <div className="footer-links">
            <a href="/">Shipping Policy</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Contact Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ProductFarmer;