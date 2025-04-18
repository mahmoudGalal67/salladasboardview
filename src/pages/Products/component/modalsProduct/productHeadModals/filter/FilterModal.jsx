import React, { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Modal, Button, Form } from "react-bootstrap";
import ExportModal from "../export/ExportModal";
import "../../../ProductHead.css";
import { ProductContext } from "../../../../../../components/context/Product";
import { Request } from "../../../../../../components/utils/Request";
import { useCookies } from "react-cookie";
import {
  allbrands,
  allCategories,
  alltradmarks,
} from "../../../../dummyProducts";

const FilterModal = ({ allProducts, categories, setcategories }) => {
  const { dispatch, products } = useContext(ProductContext);
  const [brands, setbrands] = useState([]);
  const [tradeMarks, settradeMarks] = useState([]);
  const [activecategory, setactivecategory] = useState();
  const [activebrand, setactivebrand] = useState();
  const [filtersProducts, setfiltersProducts] = useState([]);
  const [updatedProducts, setupdatedProducts] = useState([...allProducts]);
  const [checkedItems, setCheckedItems] = useState({});
  const [productBrands, setproductBrands] = useState([]);
  const [productTypes, setproductTypes] = useState([]);
  const [filters, setFilters] = useState({
    category_id: [0], // For multiple selected categories
    brand_id: [0], // For multiple selected brands
    tradeMark_id: [0], // For multiple selected tradeMarks
  });

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [cookies, setCookie] = useCookies(["usertoken"]);

  const handleShowFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);
  const currentUser = JSON.parse(localStorage.getItem("userInfo"))?.userId;
  useEffect(() => {}, [filters]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        // const { data } = await Request({
        //   url: `/api/Product_details/Getallfilter?catid=${
        //     filters.category_id[0] || 0
        //   }&bid=${filters.brand_id[0] || 0}&statid=0&tradeid=${
        //     filters.tradeMark_id[0] || 0
        //   }`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [filters]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        // const { data } = await Request({
        //   url: `/Getallcategories?userid=${currentUser}`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });

        setcategories(allCategories);
        setactivecategory(allbrands[0].category_id);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  useEffect(() => {
    const getbrands = async () => {
      try {
        // const { data } = await Request({
        //   url: `/Getallbrands?catid=${activecategory}`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });

        setbrands(allbrands);
        setactivebrand(allbrands[0]?.brand_id);
      } catch (error) {
        console.log(error);
      }
    };
    getbrands();
  }, [activecategory]);
  useEffect(() => {
    const gettadeMarks = async () => {
      try {
        // const { data } = await Request({
        //   url: `/GetallTrade_marks?bid=${activebrand}`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });

        settradeMarks(alltradmarks);
      } catch (error) {
        console.log(error);
      }
    };
    gettadeMarks();
  }, [activebrand]);
  // Function to handle checkbox changes (for category_id, brand_id, and color_name)
  const handleCheckboxChange = (filterKey, value) => (e) => {
    if (filterKey == "category_id") {
      setactivecategory(value);
    } else if (filterKey == "brand_id") {
      setactivebrand(value);
    }
    const { checked } = e.target;
    setFilters((prev) => {
      const updatedValues = checked
        ? [...prev[filterKey], value] // Add value if checked
        : prev[filterKey].filter((item) => item !== value); // Remove value if unchecked
      return {
        ...prev,
        [filterKey]: updatedValues,
      };
    });
    if (filterKey == "category_id" && !checked) {
      setFilters((prev) => {
        return {
          category_id: [0],
          brand_id: [0],
          tradeMark_id: [0],
        };
      });
      return;
    }
    if (filterKey == "brand_id" && !checked) {
      setFilters((prev) => {
        return {
          ...prev,
          brand_id: [0],
          tradeMark_id: [0],
        };
      });
      return;
    }
    setFilters((prev) => {
      const updatedValues = checked
        ? [value] // Add value if checked
        : []; // Remove value if unchecked
      return {
        ...prev,
        [filterKey]: updatedValues,
      };
    });
  };
  // Filter function
  const filterProducts = () => {
    let filtered = JSON.parse(JSON.stringify(filtersProducts));
    const { category_id, brand_id, tradeMark_id } = filters;

    // First, globally filter products by the selected criteria
    filtered = filtered.map((category) => {
      // Apply category filter if category_id is selected
      if (
        category_id.length > 0 &&
        !category_id.includes(category.category_id.toString())
      ) {
        return null; // Skip this category
      }

      // Filter brands
      const filteredBrands = category.brandsDto.filter((brand) => {
        const isBrandMatch =
          brand_id.length === 0 ||
          brand_id.some((id) => id === brand.brand_id.toString());
        return isBrandMatch;
      });

      // Skip categories with no matching brands
      if (filteredBrands.length === 0) return null;

      // Filter trdeMarks
      // const filteredTradeMarks = filteredBrands.trade_marksDto.filter(
      //   (TradeMark) => {
      //     const isTradeMarkMatch =
      //       tradeMark_id.length === 0 ||
      //       tradeMark_id.some(
      //         (id) => id === TradeMark.trade_mark_id.toString()
      //       );
      //     return isTradeMarkMatch;
      //   }
      // );

      // Skip brands with no matching trdeMarks
      // if (filteredTradeMarks.length === 0) return null;

      // Filter products within each brand
      filteredBrands.forEach((brand) => {
        brand.productDto = brand.productDto.filter((product) => {
          // Check color filter
          if (tradeMark_id.length > 0) {
            const tradeMarkMatch = tradeMark_id.some(
              (id) => id == product.trade_marksDto[0].trade_mark_id.toString()
            );
            if (!tradeMarkMatch) return false;
          }

          return true;
        });
      });

      // Return brands with filtered and sorted filteredBrands
      // filteredBrands.trade_marksDto = filteredTradeMarks;
      category.brandsDto = filteredBrands;
      return category;
    });

    // Remove null categories
    filtered = filtered.filter((category) => category !== null);

    return filtered;
  };

  // Get the filtered products
  // useEffect(() => {
  //   dispatch({
  //     type: "fetchProducts",
  //     payload: filterProducts(),
  //   });
  // }, [filters]);

  return (
    <>
      <Button className="btn-filter" onClick={handleShowFilterModal}>
        <i className="sicon-filter icon-filter"></i> تصفية
      </Button>
      <Modal
        show={showFilterModal}
        onHide={handleCloseFilterModal}
        dialogClassName="full-screen-modal"
      >
        <Modal.Body
          className="custom-scroll"
          style={{
            height: "100vh",
            overflowY: "auto",
            direction: "rtl",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>
                {" "}
                <i
                  className="sicon-filter mx-2"
                  style={{ fontSize: "15px" }}
                ></i>
                فرز المنتجات حسب
              </h4>
              <div className="close-button-class">
                <Button
                  variant="link"
                  onClick={handleCloseFilterModal}
                  className="close-button-filter"
                >
                  &times;
                </Button>
              </div>
            </div>
            <Accordion defaultActiveKey="0" className="custom-accordion">
              <Accordion.Item eventKey="3" style={{ border: "none" }}>
                <Accordion.Header>
                  <div style={{ flexGrow: 1, textAlign: "right" }}>
                    تصنيف المنتج
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {categories.map((category, index) => (
                    <div key={index} style={{ textAlign: "right" }}>
                      <label>
                        <input
                          type="checkbox"
                          style={{ marginLeft: "10px" }}
                          id={category.category_id}
                          value={category.category_id}
                          onChange={handleCheckboxChange(
                            "category_id",
                            category.category_id.toString()
                          )}
                          checked={filters.category_id.includes(
                            category.category_id.toString()
                          )}
                        />
                        {category.category_name_ar}
                      </label>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>{" "}
              <Accordion.Item eventKey="2" style={{ border: "none" }}>
                <Accordion.Header>
                  <div style={{ flexGrow: 1, textAlign: "right" }}>
                    {" "}
                    نوع المنتج
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {brands.map((brand, index) => (
                    <div key={index} style={{ textAlign: "right" }}>
                      <label>
                        <input
                          type="checkbox"
                          style={{ marginLeft: "10px" }}
                          id={brand.brand_id}
                          value={brand.brand_id}
                          onChange={handleCheckboxChange(
                            "brand_id",
                            brand.brand_id.toString()
                          )}
                          checked={filters.brand_id.includes(
                            brand.brand_id.toString()
                          )}
                        />
                        {brand.brand_name}
                      </label>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" style={{ border: "none" }}>
                <Accordion.Header>
                  <div style={{ flexGrow: 1, textAlign: "right" }}>
                    ماركة المنتج
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {tradeMarks.map((type, index) => (
                    <div key={index} style={{ textAlign: "right" }}>
                      <label>
                        <input
                          type="checkbox"
                          style={{ marginLeft: "10px" }}
                          id={type.trade_mark_id}
                          value={type.trade_mark_id}
                          onChange={handleCheckboxChange(
                            "tradeMark_id",
                            type.trade_mark_id.toString()
                          )}
                          checked={filters.tradeMark_id.includes(
                            type.trade_mark_id.toString()
                          )}
                        />
                        {type.trade_mark_name_ar}
                      </label>
                    </div>
                  ))}
                  {/* <Form.Select
                    aria-label="ماركة المنتج"
                    style={{ textAlign: "right" }}
                  >
                    <option value="" disabled hidden>
                      الماركة
                    </option>
                    {productTypes.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </Form.Select> */}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="primary"
              style={{
                backgroundColor: "#82CAFF",
                border: "none",
                width: "160px",
              }}
              onClick={() => handleCloseFilterModal()}
            >
              عرض النتائج
            </Button>
            <Button
              variant="secondary"
              style={{
                border: "none",
                margin: "0 10px",
                width: "90px",
              }}
              onClick={() =>
                setFilters({
                  category_id: [],
                  brand_id: [],
                  tradeMark_id: [],
                })
              }
            >
              إعادة تعيين
            </Button>
          </div>
          <ExportModal />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterModal;
