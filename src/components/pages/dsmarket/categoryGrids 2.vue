<template>
  <div>
    <div>
      <div class="grid-bx-ds">
        <div class="container container-ds">
          <div class="home-category-info-header col-sm-12 pr-0 pl-0">
            <h2>Apparel</h2>
            <span class="home-category-info-header-line"></span>
            <router-link to="/" class="vw-all-tp-1">
              <md-button class="mob_margin">See More Produts</md-button>
            </router-link>
          </div>

          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div
              class="home-category-info-banner-warpper col-sm-12 col-md-3 pl-0 pr-0"
              style="float:left"
            >
              <a class="home-category-info-banner banner-responsive" href="#">
                <img
                  class="theme-image"
                  src="../../../assets/images/appmain.jpg"
                  alt="
                   Apparel
                  "
                  crossorigin="anonymous"
                  data-spm-anchor-id="a2700.8293689.categoryInfoIndustry-3.i0.2ce265aaeiiuMc"
                />

                <h3 class="title">Shopping Guide For Trending Styles</h3>

                <div class="btn-wrapper">Source Now</div>
              </a>
            </div>
            <div class="home-category-info-detail col-sm-12 col-md-9 pl-0 pr-0">
              <div class="home-category-info-industry-products">
                <div class="home-category-info-tab-words">
                  <ul
                    class="home-category-info-tab-words-line col-sm-12 pl-0 pr-0"
                  >
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/appsub1.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/appsub2.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/appsub3.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/appsub4.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/appsub5.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/appsub6.jpg"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section class="home-category-info-content py-4">
            <h2>Deal of the day</h2>
          </section>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div class="col-md-6 pt-2  p-0 ">
              <div class="single-offer">
                <div class="offer-img img-full">
                  <a :href="banners[1].ads[0].link" v-if="banners">
                    <img
                      :src="banners[1].ads[0].file"
                      :alt="banners[1].ads[0].file"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 pt-2 p-0 ">
              <div class="single-offer">
                <div class="offer-img img-full">
                  <a :href="banners[1].ads[1].link" v-if="banners">
                    <img
                      :src="banners[1].ads[1].file"
                      :alt="banners[1].ads[1].file"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div class="home-category-info-header col-sm-12 pr-0 pl-0">
            <h2>BEAUTY & PERSONAL CARE</h2>
            <span class="home-category-info-header-line"></span>
            <router-link to="/" class="vw-all-tp-1">
              <md-button class="mob_margin">See More Produts</md-button>
            </router-link>
          </div>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div
              class="home-category-info-banner-warpper col-sm-12 col-md-3 pl-0 pr-0"
              style="float:left"
            >
              <a class="home-category-info-banner banner-responsive" href="#">
                <img
                  class="theme-image"
                  src="../../../assets/images/cosmain.png"
                  alt="
                   Apparel
                  "
                  crossorigin="anonymous"
                  data-spm-anchor-id="a2700.8293689.categoryInfoIndustry-3.i0.2ce265aaeiiuMc"
                />

                <h3 class="title">Popular Items Selected For You</h3>

                <div class="btn-wrapper">Source Now</div>
              </a>
            </div>
            <div class="home-category-info-detail col-sm-12 col-md-9 pl-0 pr-0">
              <div class="home-category-info-industry-products">
                <div class="home-category-info-tab-words">
                  <ul
                    class="home-category-info-tab-words-line col-sm-12 pl-0 pr-0"
                  >
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>South Africa</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/cossub1.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/cossub2.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/cossub3.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/cossub4.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/cossub5.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/cossub6.jpg"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section class="home-category-info-content py-4">
            <h2>Hot offers</h2>
          </section>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div class="col-md-6 pt-2 p-0">
              <div class="single-offer">
                <div class="offer-img img-full">
                  <a :href="banners[2].ads[0].link" v-if="banners">
                    <img
                      :src="banners[2].ads[0].file"
                      :alt="banners[2].ads[0].file"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 pt-2 p-0 ">
              <div class="single-offer">
                <div class="offer-img img-full">
                   <a :href="banners[2].ads[1].link" v-if="banners">
                    <img
                      :src="banners[2].ads[1].file"
                      :alt="banners[2].ads[1].file"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div class="home-category-info-header col-sm-12 pr-0 pl-0">
            <h2>PROPERTIES</h2>
            <span class="home-category-info-header-line"></span>
            <router-link to="/" class="vw-all-tp-1">
              <md-button class="mob_margin">See More Produts</md-button>
            </router-link>
          </div>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div
              class="home-category-info-banner-warpper col-sm-12 col-md-3 pl-0 pr-0"
              style="float:left"
            >
              <a class="home-category-info-banner banner-responsive" href="#">
                <img
                  class="theme-image"
                  src="../../../assets/images/propertymain1.jpg"
                  alt="
                   Apparel
                  "
                  crossorigin="anonymous"
                  data-spm-anchor-id="a2700.8293689.categoryInfoIndustry-3.i0.2ce265aaeiiuMc"
                />

                <h3 class="title">Popular Properties Selected For You</h3>

                <div class="btn-wrapper">Source Now</div>
              </a>
            </div>
            <div class="home-category-info-detail col-sm-12 col-md-9 pl-0 pr-0">
              <div class="home-category-info-industry-products">
                <div class="home-category-info-tab-words">
                  <ul
                    class="home-category-info-tab-words-line col-sm-12 pl-0 pr-0"
                  >
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>South Africa</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/pr1.png"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/pr2.png"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/pr3.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/pr4.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/pr5.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Men fashion</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/pr5.jpg"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section class="home-category-info-content py-4">
            <h2>Deal of the day</h2>
          </section>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div class="col-md-6  pt-2 p-0">
              <div class="single-offer">
                <div class="offer-img img-full">
                   <a :href="banners[3].ads[0].link" v-if="banners">
                    <img
                      :src="banners[3].ads[0].file"
                      :alt="banners[3].ads[0].file"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 pt-2 p-0">
              <div class="single-offer">
                <div class="offer-img img-full">
                   <a :href="banners[3].ads[1].link" v-if="banners">
                    <img
                      :src="banners[3].ads[1].file"
                      :alt="banners[3].ads[1].file"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div class="home-category-info-header col-sm-12 pr-0 pl-0">
            <h2>CONSUMER ELECTRONICS</h2>
            <span class="home-category-info-header-line"></span>
            <router-link to="/" class="vw-all-tp-1">
              <md-button class="mob_margin">See More Produts</md-button>
            </router-link>
          </div>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div
              class="home-category-info-banner-warpper col-sm-12 col-md-3 pl-0 pr-0"
              style="float:left"
            >
              <a class="home-category-info-banner banner-responsive" href="#">
                <img
                  class="theme-image"
                  src="../../../assets/images/consumermain.png"
                  alt="
                   Apparel
                  "
                  crossorigin="anonymous"
                  data-spm-anchor-id="a2700.8293689.categoryInfoIndustry-3.i0.2ce265aaeiiuMc"
                />

                <h3 class="title">Popular Electronics Selected For You</h3>

                <div class="btn-wrapper">Source Now</div>
              </a>
            </div>
            <div class="home-category-info-detail col-sm-12 col-md-9 pl-0 pr-0">
              <div class="home-category-info-industry-products">
                <div class="home-category-info-tab-words">
                  <ul
                    class="home-category-info-tab-words-line col-sm-12 pl-0 pr-0"
                  >
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>LCD Monitors</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/c11.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Blockchain Miners</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/c22.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Laptops</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/c33.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Mobile phones</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/c44.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Mobile phones Bags & cases</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/c55.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Chargers</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/c66.jpg"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section class="home-category-info-content py-4">
            <h2>Deal of the day</h2>
          </section>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div class="col-md-6 pt-2 p-0">
              <div class="single-offer">
                <div class="offer-img img-full">
                    <a :href="banners[4].ads[0].link" v-if="banners">
                    <img
                      :src="banners[4].ads[0].file"
                      :alt="banners[4].ads[0].file"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 pt-2 p-0">
              <div class="single-offer">
                <div class="offer-img img-full">
                   <a :href="banners[4].ads[1].link" v-if="banners">
                    <img
                      :src="banners[4].ads[1].file"
                      :alt="banners[4].ads[1].file"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div class="home-category-info-header col-sm-12 pr-0 pl-0">
            <h2>Services</h2>
            <span class="home-category-info-header-line"></span>
            <router-link to="/" class="vw-all-tp-1">
              <md-button class="mob_margin">See More Produts</md-button>
            </router-link>
          </div>
          <section class="home-category-info-content col-sm-12 pl-0 pr-0">
            <div
              class="home-category-info-banner-warpper col-sm-12 col-md-3 pl-0 pr-0"
              style="float:left"
            >
              <a class="home-category-info-banner banner-responsive" href="#">
                <img
                  class="theme-image"
                  src="../../../assets/images/anservice11.jpg"
                  alt="
                   Apparel
                  "
                  crossorigin="anonymous"
                  data-spm-anchor-id="a2700.8293689.categoryInfoIndustry-3.i0.2ce265aaeiiuMc"
                />

                <h3 class="title">Popular Services Selected For You</h3>

                <div class="btn-wrapper">Source Now</div>
              </a>
            </div>
            <div class="home-category-info-detail col-sm-12 col-md-9 pl-0 pr-0">
              <div class="home-category-info-industry-products">
                <div class="home-category-info-tab-words">
                  <ul
                    class="home-category-info-tab-words-line col-sm-12 pl-0 pr-0"
                  >
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Cleaning and House ..</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/sr1.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Handy Man Services</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/sr2.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Interior Decorations</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/sr4.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Plumbing & Maintanance Services</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/sr4.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Mobile Phones Bags & Cases</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/sr5.jpg"
                        />
                      </a>
                    </li>
                    <li
                      class=" home-category-info-tab-word-responsive word-1 zoom-wrap  col-sm-4 pr-0 pl-0"
                    >
                      <a href="#">
                        <div class="home-category-info-tab-word-content-res">
                          <h3>Mechanical Maintenance Services</h3>
                        </div>
                        <img
                          class="home-category-info-tab-word-img-res zoom-in"
                          src="../../../assets/images/sr6.jpg"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <!-- <section class="home-category-info-footer">
            <ul class="home-category-info-hot-words">
              <li
                v-for="(ftrsublink, index) in gridbx.featuredLnk"
                :key="index"
              >
                <router-link to="/">
                  <md-button>{{ ftrsublink.subftrlnkTxt }}</md-button>
                </router-link>
              </li>
            </ul>
          </section> -->
          <section class="offer-img-area pt-20" v-if="banners">
            <div class="row m-0">
              <!-- 
             
              <div class="col-md-6 p-0">
                <div class="single-offer">
                  <div class="offer-img img-full">
                    <router-link to="/">
                      <img
                        :src="banners[3].ads[0].file"
                        :alt="banners[3].ads[0].file"
                      />
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-6 p-0">
                <div class="single-offer">
                  <div class="offer-img img-full">
                    <router-link to="/">
                      <img
                        :src="banners[3].ads[1].file"
                        :alt="banners[3].ads[1].file"
                      />
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-6 p-0">
                <div class="single-offer">
                  <div class="offer-img img-full">
                    <router-link to="/">
                      <img
                        :src="banners[4].ads[0].file"
                        :alt="banners[4].ads[0].file"
                      />
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-6 p-0">
                <div class="single-offer">
                  <div class="offer-img img-full">
                    <router-link to="/">
                      <img
                        :src="banners[4].ads[1].file"
                        :alt="banners[4].ads[1].file"
                      />
                    </router-link>
                  </div>
                </div>
              </div> -->
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["banners"],

  data() {
    return {
      gridContent: [
        {
          CategoryTxtHd: "Apparel",
          MainThmbTxt: "Shopping Guide For Trending Styles",
          MainThumbImg: "appmain.jpg",
          MainThmbLnk: "/",
          SubGrdBx: [
            {
              subThmbImg: "appsub1.jpg",
              subThmbTxt: "Men Fashion",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "appsub2.jpg",
              subThmbTxt: "Men Fashion",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "appsub3.jpg",
              subThmbTxt: "Men Fashion",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "appsub4.jpg",
              subThmbTxt: "Men Fashion",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "appsub5.jpg",
              subThmbTxt: "Men Fashion",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "appsub5.jpg",
              subThmbTxt: "Men Fashion",
              subThmbLnk: "/"
            }
          ],
          featuredLnk: [
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            }
          ],
          addBoxTp: [
            {
              addcntPosterImg: "7.jpg",
              addcntPosterLnk: "/"
            },
            {
              addcntPosterImg: "6.jpg",
              addcntPosterLnk: "/"
            }
          ]
        },
        {
          CategoryTxtHd: "Beauty & Personal Care",
          MainThmbTxt: "Popular Items Selected For You",
          MainThumbImg: "cosmain.png",
          MainThmbLnk: "/",
          SubGrdBx: [
            {
              subThmbImg: "cossub1.jpg",
              subThmbTxt: "South Africa",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "cossub2.jpg",
              subThmbTxt: "Essential Oil",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "cossub3.jpg",
              subThmbTxt: "False Eyelashes",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "cossub4.jpg",
              subThmbTxt: "Face Cream & Lotions",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "cossub5.jpg",
              subThmbTxt: "Face Washes",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "cossub6.jpg",
              subThmbTxt: "Face Shop",
              subThmbLnk: "/"
            }
          ],
          featuredLnk: [
            {
              subftrlnkTxt: "Bulk Sunscreem",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cartoon Cream",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cavitation Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cyrolipolisys Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            }
          ],
          addBoxTp: [
            {
              addcntPosterImg: "7.jpg",
              addcntPosterLnk: "/"
            },
            {
              addcntPosterImg: "6.jpg",
              addcntPosterLnk: "/"
            }
          ]
        },
        {
          CategoryTxtHd: "Properties",
          MainThmbTxt: "Popular Properties Selected For You",
          MainThumbImg: "propertymain1.jpg",
          MainThmbLnk: "/",
          SubGrdBx: [
            {
              subThmbImg: "pr1.png",
              subThmbTxt: "Properties For Rent",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "pr2.png",
              subThmbTxt: "Properties For Sale",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "pr3.jpg",
              subThmbTxt: "Appartments For Rent",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "pr4.jpg",
              subThmbTxt: "Flat For Rent",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "pr5.jpg",
              subThmbTxt: "Short Term(monthly)",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "pr5.jpg",
              subThmbTxt: "Short term (Daily)",
              subThmbLnk: "/"
            }
          ],
          featuredLnk: [
            {
              subftrlnkTxt: "Bulk Sunscreem",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cartoon Cream",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cavitation Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cyrolipolisys Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            }
          ],
          addBoxTp: [
            {
              addcntPosterImg: "7.jpg",
              addcntPosterLnk: "/"
            },
            {
              addcntPosterImg: "6.jpg",
              addcntPosterLnk: "/"
            }
          ]
        },
        {
          CategoryTxtHd: "Consumer Electronics",
          MainThmbTxt: "Popular Electronics Selected For You",
          MainThumbImg: "consumermain.png",
          MainThmbLnk: "/",
          SubGrdBx: [
            {
              subThmbImg: "c11.jpg",
              subThmbTxt: "LCD Monitors",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "c22.jpg",
              subThmbTxt: "Blockchain Miners",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "c33.jpg",
              subThmbTxt: "Laptops",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "c44.jpg",
              subThmbTxt: "Mobile Phones",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "c55.jpg",
              subThmbTxt: "Mobile Phones Bags & Cases",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "c66.jpg",
              subThmbTxt: "Chargers",
              subThmbLnk: "/"
            }
          ],
          featuredLnk: [
            {
              subftrlnkTxt: "Bulk Sunscreem",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cartoon Cream",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cavitation Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cyrolipolisys Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            }
          ],
          addBoxTp: [
            {
              addcntPosterImg: "7.jpg",
              addcntPosterLnk: "/"
            },
            {
              addcntPosterImg: "6.jpg",
              addcntPosterLnk: "/"
            }
          ]
        },
        {
          CategoryTxtHd: "Services",
          MainThmbTxt: "Popular Services Selected For You",
          MainThumbImg: "anservice11.jpg",
          MainThmbLnk: "/",
          SubGrdBx: [
            {
              subThmbImg: "sr1.jpg",
              subThmbTxt: "Cleaning and House ..",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "sr2.jpg",
              subThmbTxt: "Handy Man Services",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "sr4.jpg",
              subThmbTxt: "Interior Decorations",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "sr4.jpg",
              subThmbTxt: "Plumbing & Maintanance Services",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "sr5.jpg",
              subThmbTxt: "Mobile Phones Bags & Cases",
              subThmbLnk: "/"
            },
            {
              subThmbImg: "sr6.jpg",
              subThmbTxt: "Mechanical Maintenance Services",
              subThmbLnk: "/"
            }
          ],
          featuredLnk: [
            {
              subftrlnkTxt: "Bulk Sunscreem",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cartoon Cream",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cavitation Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "Cyrolipolisys Machine",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            },
            {
              subftrlnkTxt: "African Dresses",
              subftrlnkLnk: "/"
            }
          ],
          addBoxTp: [
            {
              addcntPosterImg: "7.jpg",
              addcntPosterLnk: "/"
            },
            {
              addcntPosterImg: "6.jpg",
              addcntPosterLnk: "/"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
a {
  text-decoration: none !important;
}
.home-category-info-header .md-primary {
  position: absolute;
  top: 10px;
  right: 0;
  height: 40px;
}
.home-category-info-hot-words .md-button {
  height: fit-content;
}
.home-category-info-header .vw-all-tp-1 .md-button {
  height: fit-content;
}
.home-category-info-hot-words > li {
  margin-right: -10px;
}
.home-category-info-tab-word,
.home-category-info-tab-words {
  width: 100%;
}
.home-category-info-tab-words-line {
  width: 100%;
  height: fit-content;
}

.home-category-info-tab-word {
  display: block;
  float: left;
}

.home-category-info-tab-word-responsive {
  display: block;
  position: relative;
  height: 100%;
  overflow: hidden;
  border-color: #ebecf0;
  border-width: 0 1px 1px 0;
  border-style: solid;
  vertical-align: top;
  box-sizing: border-box;
  font-size: 14px;
  float: left;
}
.home-category-info-industry-products {
  width: 100%;
}
.home-category-info-tab-word-img-res {
  position: relative;
  float: left;
  overflow: hidden;
  margin-top: 0px;
  margin-bottom: 20px;
  margin-right: 10px;
  height: 100px;
  width: 100px;
  float: right;
}
.home-category-info-tab-word-content-res {
  position: relative;
  padding: 20px 0px 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
}
.home-category-info-tab-word-content-res h3 {
  width: 100%;
}

.home-category-info-content {
  height: fit-content;
}
.home-category-info-banner .theme-image {
  width: 100%;
}

.home-category-info-banner.banner-responsive .title {
  max-width: 200px;
  color: #fff;
  padding-right: 30px;
  font-size: 22px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  line-height: 28px;
  font-size: 20px;
  overflow: hidden;
  position: absolute;
  top: 28px;
  left: 20px;
  right: 20px;
}
.home-category-info-hot-words {
  height: fit-content;
}
@media screen and (max-width: 1000px) {
  .home-category-info-tab-word-content-res h3 {
    width: 100%;
    font-size: 11px;
    padding-left: 5px;
  }
  .home-category-info-tab-word-content-res {
    padding-left: 0px;
  }
  .home-category-info-header h2 {
    font-size: 16px;
  }
  .md-button .md-ripple {
    padding: 0 0px;
  }
}

@media screen and (max-width: 600px) {
  .home-category-info-content {
    display: block;
  }
  .home-category-info-banner-warpper {
    float: left;
    width: 100%;
    height: 330px;
  }

  .md-button-content {
    font-size: 13px;
  }

  .home-category-info-hot-words > li {
    width: fit-content;
    margin-right: 15px;
    float: left;
  }
  .md-button-content {
    word-wrap: break-word;

    word-break: break-word;
  }

  .offer-img-area > .row > div:nth-child(even) {
    padding-left: 5px !important;
    margin-left: -5px;
    margin-top: 10px;
  }

  .home-category-info-header h2 {
    font-size: 13px;
  }

  .md-button {
    padding: 0px 8px;
  }

  .home-category-info-tab-word-content-res h3 {
    font-size: 13px;
    margin-left: 10px;
  }

  .home-category-info-header-line {
    display: none;
  }

  .vw-all-tp-1 {
    right: -6px;
  }

  .home-category-info-header .vw-all-tp-1 .md-button {
    padding: 0px;
    margin-right: 0px;
  }

  .md-button-content {
    font-size: 13px;
  }

  .home-category-info-header {
    margin-top: 0px;
  }

  .home-category-info-tab-word-img-res {
    margin-bottom: 10px;
  }

  .home-category-info-hot-words .md-button {
    padding-left: 0px;
    margin-left: 0px;
    margin-right: 0px;
  }

  section.offer-img-area.pt-20 {
    margin-top: -5px;
  }

  .grid-bx-ds {
    margin-bottom: 5px;
  }
  .mob_margin {
    margin-right: 20px !important;
  }
}

@media screen and (max-width: 300px) {
  .md-bottom-bar.md-type-fixed .md-bottom-bar-item {
    min-width: 50px !important;
  }
  .NavIcnTp1Img {
    width: 26px;
    height: 26px;
  }
  .home-category-info-tab-word-img-res {
    margin-right: 40px;
  }
  .home-category-info-header {
    margin-top: 0px;
    margin-bottom: 0px;
    overflow: visible;
  }
  .home-category-info-header h2 {
    margin-top: 30px;
    margin-right: 30px;
  }

  .grid-bx-ds {
    margin-bottom: 25px;
    margin-right: 40px;
  }

  .md-button {
    font-size: 12px !important;
    min-width: fit-content;
    padding: 0 0px !important;
  }
  .md-button .md-ripple {
    padding: 0 0px !important;
  }

  .home-category-info-hot-words > li {
    margin-right: 10px;
  }
}
</style>
