import React from "react";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = React.memo(() => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              MyCompany
            </h2>
            <p className="text-sm leading-relaxed">
              Chúng tôi cung cấp giải pháp phần mềm và dịch vụ công nghệ
              giúp doanh nghiệp phát triển bền vững.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@mycompany.com</li>
              <li>Phone: 0901 234 567</li>
              <li>Địa chỉ: Cần Thơ, Việt Nam</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Theo dõi chúng tôi
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} MyCompany. All rights reserved.
        </div>

      </div>
    </footer>
  );
});

export default Footer;