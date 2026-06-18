import {
  ShoppingCart,
  Search,
  Star,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "rau-cu",
      name: "Rau củ",
      image:
        "https://cdn.tgdd.vn/Files/2018/07/27/1104673/co-phai-an-nhieu-rau-cu-la-tot-202112301617596948.jpg",
    },
    {
      id: "trai-cay",
      name: "Trái cây",
      image:
        "https://vcdn1-suckhoe.vnecdn.net/2022/12/18/fruits-1729-1671358576.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=zMoW-Mc5jeXNpaeL-uBd3Q",
    },
    {
      id: "dac-san",
      name: "Đặc sản địa phương",
      image:
        "https://cdn.hstatic.net/files/200000863027/article/cac_loai_hat_-_lua_chon_qua_tet_tu_tam_viet_fcd298417e194f42823e6cbbb583093f_1024x1024.jpg",
    },
    {
      id: "huu-co",
      name: "Thực phẩm hữu cơ",
      image:
        "https://phunuvietnam.mediacdn.vn/media/news/f57e9defd1303332611ab2ca1994500d/thuc-pham-huu-co-5.jpg",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Rau muống Organic",
      price: "25.000đ",
      originalPrice: "30.000đ",
      location: "Đà Lạt",
      image:
        "https://product.hstatic.net/200000477661/product/rau-muong-1_3efd60b9cfe343c081b1c3a0b5eeaec0_master.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Cam sành Tiền Giang",
      price: "45.000đ",
      originalPrice: null,
      location: "Tiền Giang",
      image:
        "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/6/2/cam-sanh-1-1134-1685673156031-16856731562081411734272.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Gạo ST25",
      price: "180.000đ",
      originalPrice: null,
      location: "Sóc Trăng",
      image:
        "https://cdn.tgdd.vn/2020/12/CookProduct/9-1200x676.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: "Dâu tây Đà Lạt",
      price: "120.000đ",
      originalPrice: null,
      location: "Lâm Đồng",
      image:
        "https://storage.googleapis.com/onelife-public/blog.onelife.vn/2024/01/bc3a163d-dau-tay-da-lat.png",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white">

      {/* HEADER */}
      <header className="top-navbar">
        <div className="navbar-container">

          {/* LEFT */}
          <div className="navbar-left">
            <h1 className="logo">PreOnic</h1>

            <div className="navbar-links">
              <a href="/" className="active-link">
                Trang Chủ
              </a>

              <button
                onClick={() => navigate("/products")}
                className="nav-btn"
              >
                Sản Phẩm
              </button>

              <a href="/">Farmers</a>
              <a href="/">About</a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="navbar-right">

            {/* SEARCH */}
            <div className="search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Tìm kiếm nông sản..."
              />
            </div>

            {/* CART */}
            <button className="icon-btn">
              <ShoppingCart size={20} />
            </button>

            {/* AVATAR */}
            <button
              onClick={() => navigate("/dashboard")}
              className="avatar-btn"
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="avatar"
              />
            </button>

            {/* LOGIN */}
            <button
              onClick={() => navigate("/login")}
              className="signin-btn"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-96 md:h-screen bg-gray-900 overflow-hidden">
        <img
          src="https://afamilycdn.com/150157425591193600/2020/3/30/9051274933579161376641668463886982718685184n-15855433552701309628663.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Nông sản sạch từ tâm - Kết nối từ đất lành đến phố thị
              </h1>

              <p className="text-base md:text-lg mb-8 text-white leading-relaxed">
                Chúng tôi mang tinh hoa lý tưởng người nông dân Việt đến tận tay bạn.
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <button className="bg-green-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-800 transition">
                  Khám phá ngay
                </button>

                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition">
                  Về chúng tôi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="relative -mt-12 md:-mt-16 z-20 px-4 md:px-6 pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 flex gap-3 flex-col md:flex-row">

            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <Search size={20} className="text-gray-500" />

              <input
                type="text"
                placeholder="Bạn đang tìm gì hôm nay?"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <button className="bg-green-700 text-white px-6 rounded-lg font-medium hover:bg-green-800 transition">
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Danh mục sản phẩm
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="text-center cursor-pointer hover:shadow-lg transition-shadow group"
            >
              <div className="relative mb-4 mx-auto w-32 h-32 md:w-48 md:h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full rounded-full object-cover shadow-md group-hover:scale-105 transition-transform"
                />
              </div>

              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Sản phẩm nổi bật
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                <div className="p-4">

                  <h3 className="font-semibold text-gray-800 text-sm mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 text-xs mb-4">
                    <MapPin size={12} />
                    {product.location}
                  </div>

                  <button className="w-full bg-green-700 text-white py-2 rounded font-medium hover:bg-green-800 transition text-xs">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="bg-[#f8f6f1] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* TITLE */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1d3b1f] mb-3">
              Gương mặt Đất Lành
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Kết nối trực tiếp với những người nông dân tâm huyết đang sau mỗi sản phẩm bạn tin dùng.
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

            {/* BIG CARD */}
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-lg group h-[420px]">
              <img
                src="https://cdnphoto.dantri.com.vn/_3enIjc7LENjXkrH_phg3K3sxIs=/thumb_w/1020/2024/10/21/dsc0715-1729494957665.jpg?watermark=true"
                alt="farmer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 text-white">

                <span className="bg-orange-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                  Người giữ hồn quê
                </span>

                <h3 className="text-3xl font-bold mt-4 mb-3">
                  Bác Minh - Vườn rau Đà Lạt
                </h3>

                <p className="text-sm md:text-base text-gray-200 max-w-xl leading-relaxed">
                  “Mỗi cây rau là một lời cam kết về sức khỏe của cộng đồng.
                  Tôi trồng bằng cả trái tim.”
                </p>

                <button className="mt-5 text-green-300 font-semibold hover:text-white transition">
                  Xem câu chuyện của bác →
                </button>
              </div>
            </div>

            {/* RIGHT CARDS */}
            <div className="flex flex-col gap-6">

              {/* CARD 1 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images2.thanhnien.vn/528068263637045248/2023/8/5/nong-dan-16912380915641494490317.png"
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-bold text-gray-800">
                      Chị Hiền
                    </h4>

                    <p className="text-sm text-gray-500">
                      Vườn cây ăn trái Tiền Giang
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 italic text-sm leading-relaxed">
                  “Gửi hương vị ngọt ngào từ miền Tây đến mọi gia đình Việt.”
                </p>
              </div>

              {/* CARD 2 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://img.freepik.com/hinh-chup-cao-cap/mot-nguoi-nong-dan-doi-non-la-dang-dung-tren-canh-dong-tao-dang-voi-hai-tay-gio-len-tieu-diem-chon-loc-tren-anh-khuon-mat_37129-2131.jpg"
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-bold text-gray-800">
                      Anh Thanh
                    </h4>

                    <p className="text-sm text-gray-500">
                      Hợp tác xã lúa Sóc Trăng
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 italic text-sm leading-relaxed">
                  “Kết hợp công nghệ và kinh nghiệm truyền thống để có hạt gạo vàng.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#2f6b2f] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-2xl">
              🛡️
            </div>

            <h3 className="font-bold text-lg mb-2">
              100% Sạch & An toàn
            </h3>

            <p className="text-sm text-green-100 leading-relaxed">
              Quy trình kiểm soát chất lượng nghiêm ngặt theo tiêu chuẩn quốc tế.
            </p>
          </div>

          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-2xl">
              🌱
            </div>

            <h3 className="font-bold text-lg mb-2">
              Nguồn gốc rõ ràng
            </h3>

            <p className="text-sm text-green-100 leading-relaxed">
              Truy xuất nguồn gốc sản phẩm chỉ với một thao tác quét mã QR đơn giản.
            </p>
          </div>

          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-2xl">
              🚚
            </div>

            <h3 className="font-bold text-lg mb-2">
              Giao hàng nhanh 2H
            </h3>

            <p className="text-sm text-green-100 leading-relaxed">
              Đảm bảo độ tươi ngon nhất khi đến tay bạn với hệ thống logistics hiện đại.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f8f6f1] py-14 border-t border-gray-200">

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold text-[#1d3b1f] mb-4">
              PreOnic
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Bridging the gap between soil and soul. Nâng tầm giá trị nông sản Việt.
            </p>

            <div className="flex gap-3 mt-5">

              <button className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-green-700 hover:text-white transition">
                🌐
              </button>

              <button className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-green-700 hover:text-white transition">
                ✉️
              </button>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">
              CÔNG TY
            </h4>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>About Us</li>
              <li>Sustainability</li>
              <li>Farmers Network</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">
              HỖ TRỢ
            </h4>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>Shipping Policy</li>
              <li>FAQ</li>
              <li>Contact Support</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">
              BẢN TIN SẠCH
            </h4>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Nhận cập nhật về các đợt nông sản mới nhất và ưu đãi độc quyền.
            </p>

            <div className="flex flex-col gap-3">

              <input
                type="email"
                placeholder="Email của bạn"
                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
              />

              <button className="bg-green-800 text-white py-3 rounded-lg hover:bg-green-900 transition font-medium">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-6 text-center text-sm text-gray-500">
          © 2026 PreOnic AgriTech. Bridging the gap between soil and soul. Bảo lưu mọi quyền.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;