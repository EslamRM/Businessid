<template>
  <div v-if="!showBubbleLoader">
    <div class="lst-bx-wrp fltr-pg-1">
      <div class="storetopPadd ch-main-layout">
        <div class="ch-left-layout">
          <div class="left-category">
            <div class="alife-bc-category-nav">
              <div class="menu-container">
                <div class="category-menu-wrapper">
                  <div class="menu">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Location</h2>
                        <button
                          class="md-button md-theme-default filtertoggleboxBtn"
                        >
                          <span class="material-icons">keyboard_arrow_up</span>
                        </button>
                      </div>
                      <div class="show-bx-1 reagion ctSelect">
                        <select
                          name="Country"
                          @change="onChangeCountry"
                          class=""
                        >
                          <option value="" data-foo="">All Countries </option>
                          <option
                            :selected="country.name == filters.location_country"
                            :data-foo="country.name"
                            v-for="country in countries"
                            :id="country.pk_countries_id"
                            :key="country.name"
                            :value="country.pk_countries_id"
                          >
                            {{ country.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="cst-bx-v-1">
                      <div class="show-bx-1  ctSelect reagion">
                        <select
                          name="city"
                          id="city"
                          placeholder="City"
                          @change="onChangeCity"
                        >
                          <option data-foo="" value="">Choose City </option>
                          <option
                            :selected="city.location == filters.location_city"
                            :data-foo="city.location"
                            v-for="city in cities"
                            :key="city.pk_countries_id"
                            :value="city.pk_countries_id"
                          >
                            {{ city.location }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="cst-bx-v-1" v-if="showArea">
                      <div class="show-bx-1  ctSelect reagion">
                        <select
                          name="area"
                          id="area"
                          placeholder="Area"
                          v-model="filters.location_area"
                          @change="onChangeArea()"
                        >
                          <option value="">Choose Area </option>
                          <option
                            :selected="area.location == filters.location_area"
                            v-for="area in areas"
                            :key="area.pk_countries_id"
                            :value="area.location"
                          >
                            {{ area.location }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="secton-title">
                      <h2>Search</h2>
                      <button
                        class="md-button md-theme-default filtertoggleboxBtn"
                      >
                        <span class="material-icons">keyboard_arrow_up</span>
                      </button>
                    </div>

                    <div class="show-bx-1 ctSelect filter-select">
                      <select
                        v-model="filters.market_type"
                        @change="market_type()"
                      >
                        <option value="">All Types</option>
                        <option value="demand">Demand</option>
                        <option value="supply">Supply</option>
                      </select>
                    </div>
                    <div class="show-bx-1 ctSelect filter-select">
                      <select @change="category">
                        <option value="" data-foo="">All Categories</option>
                        <option
                          :selected="category.name == filters.l1value"
                          :data-foo="category.name"
                          v-for="category in categories"
                          :key="category.id"
                          :value="category.id"
                          >{{ category.name }}</option
                        >
                      </select>
                    </div>
                    <div class="show-bx-1 ctSelect filter-select">
                      <select v-model="filters.auto_type" @change="auto_type()">
                        <option value="">Auto Type</option>

                        <option value="new">New</option>
                        <option value="old">Used </option>
                      </select>
                    </div>
                    <div class="show-bx-1 ctSelect filter-select">
                      <select
                        v-model="filters.auto_purpose"
                        @change="auto_purpose()"
                      >
                        <option value="">Auto Purpose</option>
                        <option value="rent">Rent</option>
                        <option value="sale">Sale </option>
                      </select>
                    </div>

                    <div
                      class="show-bx-1 ctSelect filter-select"
                      v-if="showSubcategory"
                    >
                      <select @change="sub_category">
                        <option value="" data-foo="">All Categories</option>
                        <option
                          :selected="category.name == filters.l2value"
                          :data-foo="category.name"
                          v-for="category in sub_categories"
                          :key="category.id"
                          :value="category.id"
                          >{{ category.name }}</option
                        >
                        >
                      </select>
                    </div>
                    <div
                      class="show-bx-1 ctSelect filter-select"
                      v-if="showThirdLevel"
                    >
                      <select @change="ThirdLevel">
                        <option value="" data-foo="">All Categories</option>
                        <option
                          :selected="category.name == filters.l3value"
                          :data-foo="category.name"
                          v-for="category in ThirdLevels"
                          :key="category.id"
                          :value="category.name"
                          >{{ category.name }}</option
                        >
                        >
                      </select>
                    </div>
                    <div class="show-bx-1 ranger">
                      <div class="secton-title">
                        <h2>Price</h2>
                      </div>
                      <Range @drag="filterPriceRange" />
                    </div>
                    <div class="show-bx-1" v-if="showYear">
                      <div class="secton-title">
                        <h2>Year</h2>
                      </div>
                      <div
                        class="dropdown__popup dropdown__popup--opened false "
                      >
                        <div class="show-bx-1 area-size ctSelectDoubled">
                          <div class="breakk left">
                            <select
                              v-model="filters.year_from"
                              name="bathrooms"
                              @change="onChangeYearFrom($event)"
                            >
                              <option value="">Year from</option>
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
                              <option value="2019">2019</option>
                              <option value="2018">2018</option>
                              <option value="2017">2017</option>
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                              <option value="2006">2006</option>
                              <option value="2005">2005</option>
                              <option value="2004">2004</option>
                              <option value="2003">2003</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                            </select>
                          </div>
                          <div class="breakk right">
                            <select
                              v-model="filters.year_to"
                              name="araea_size"
                              @change="onChangeYearTo($event)"
                            >
                              <option value="">Year to</option>
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
                              <option value="2019">2019</option>
                              <option value="2018">2018</option>
                              <option value="2017">2017</option>
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                              <option value="2006">2006</option>
                              <option value="2005">2005</option>
                              <option value="2004">2004</option>
                              <option value="2003">2003</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="showAdvancedHeading"
                      class="filter-select advanced-search d-flex"
                      @click="toggleAdvancedSearch"
                    >
                      <h3>Advanced Search</h3>
                      <span class="material-icons">
                        {{ advSearchArrow }}
                      </span>
                    </div>
                    <div v-if="isAdvanced">
                      <div v-if="selectedCategory == 'Cars'">
                        <div v-for="(feature, index) in features" :key="index">
                          <div v-if="feature.key == 'body_type'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Body Type</h2>
                              </div>
                              <div class="show-bx-1 auto-scrol-bx">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeBody_Type"
                                    v-model="filters.body_type"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'doors'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Doors</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeDoors"
                                    v-model="filters.doors"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'cylinders'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>No. of Cylinders</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeCylinders"
                                    v-model="filters.cylinders"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'horsepower'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Horsepower</h2>
                              </div>
                              <div class="show-bx-1 auto-scrol-bx">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeHorsepower"
                                    v-model="filters.horsepower"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'transmission_type'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Transmission Type</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeTransmission"
                                    v-model="filters.transmission_type"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'colors'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Color</h2>
                              </div>
                              <div class="show-bx-1 auto-scrol-bx">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeColor"
                                    v-model="filters.colors"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'warranty'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Warranty</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeWarranty"
                                    v-model="filters.warranty"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'fuel_type'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Fuel Type</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChnageFueltype"
                                    v-model="filters.fuel_type"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'regional_specs'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Regional Specs</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeRegion"
                                    v-model="filters.regional_specs"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="selectedCategory == 'Boats'">
                        <div v-for="(feature, index) in features" :key="index">
                          <div v-if="feature.key == 'age'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Age</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select
                                  name="age"
                                  @change="onChangeAge"
                                  v-model="filters.age"
                                >
                                  <option value=""></option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'body_condition'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Condition</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select
                                  v-model="filters.body_condition"
                                  @change="onChangeCondition"
                                >
                                  <option value=""></option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'usage'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Usage</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select
                                  v-model="filters.usage"
                                  @change="onChangeUsage"
                                >
                                  <option value=""></option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'length'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Length</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    v-model="filters.length"
                                    @change="changeLength"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'warranty'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Warranty</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    v-model="filters.warranty"
                                    @change="onChangeWarranty"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="selectedCategory == 'Accessories & Spare Parts'"
                      >
                        <div v-for="(feature, index) in features" :key="index">
                          <div v-if="feature.key == 'mechanical_condition'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Condition</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select>
                                  <option value=""></option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'usage'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Usage</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select>
                                  <option value=""></option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="selectedCategory == 'Heavy Vehicles'">
                        <div v-for="(feature, index) in features" :key="index">
                          <div v-if="feature.key == 'cylinders'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>No. of Cylinders</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    v-model="filters.cylinders"
                                    @change="onChangeCylinders"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'horsepower'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Horsepower</h2>
                              </div>
                              <div class="show-bx-1 ">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeHorsepower"
                                    v-model="filters.horsepower"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'warranty'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Warranty</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeWarranty"
                                    v-model="filters.warranty"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'fuel_type'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Fuel Type</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChnageFueltype"
                                    v-model="filters.fuel_type"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="selectedCategory == 'Motorcycles'">
                        <div v-for="(feature, index) in features" :key="index">
                          <div v-if="feature.key == 'drive_system'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Final Drive System</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select
                                  v-model="filters.drive_system"
                                  @change="onChangeDrive"
                                >
                                  <option value=""></option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'wheels'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Wheels</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select
                                  v-model="filters.wheels"
                                  @change="onChangeWheels"
                                >
                                  <option value="">All Types</option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'usage'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Usage</h2>
                              </div>
                              <div class="show-bx-1  ctSelect">
                                <select
                                  v-model="filters.usage"
                                  @change="onChangeUsage"
                                >
                                  <option value="">All Types</option>
                                  <option
                                    v-for="value in feature.values"
                                    :key="value"
                                    :value="value"
                                    >{{ value }}</option
                                  >
                                </select>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'manufacturer'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Manufacturer</h2>
                              </div>
                              <div class="show-bx-1 auto-scrol-bx">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    v-model="filters.manufacturer"
                                    @change="onChangeManufacturer"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="feature.key == 'engine_size'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Engine Size</h2>
                              </div>
                              <div class="show-bx-1 ">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    v-model="filters.engine_size"
                                    @change="onChangeEngine"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="feature.key == 'warranty'">
                            <div class="cst-bx-v-1">
                              <div class="secton-title">
                                <h2>Warranty</h2>
                              </div>
                              <div class="show-bx-1">
                                <div
                                  class="fltr-slct-bx"
                                  v-for="value in feature.values"
                                  :key="value"
                                >
                                  <md-checkbox
                                    @change="onChangeWarranty"
                                    v-model="filters.warranty"
                                    class="smallOption"
                                    :value="value"
                                    >{{ value }}</md-checkbox
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="ch-right-layout"
          v-infinite-scroll="loadMore"
          :infinite-scroll-listen-for-event="true"
          infinite-scroll-immediate-check="false"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="1500"
        >
          <ctcarListingbox
            @price_sort="OnCLickSortPrice"
            @toggleFilter="showMobile"
            :sort="sort"
          >
          </ctcarListingbox>
          <div v-if="showImage" class="image-wrap">
            <h2 class="nodata">NO AUTOS FOUND</h2>
            <img class="no-data-img" src="../../../assets/images/data.png" />
          </div>
          <!-- <div class="loader"  v-if="showLoader">
            <div class="circle-loader"></div>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="showMobileFilter">
      <div class="search-filter-mobile-wrapper">
        <header>
          <h2>Filter</h2>
          <button type="button" class="closeButton" @click="closeFilter">
            <img src="../../../assets/images/close.svg" alt="close" />
          </button>
        </header>
        <div class="facetsWrapper">
          <div class="filter-name">
            <div class="heading "></div>
            <div class="cst-bx-v-1">
              <div class="secton-title">
                <h2>Location</h2>
                <button class="md-button md-theme-default filtertoggleboxBtn">
                  <span class="material-icons">keyboard_arrow_up</span>
                </button>
              </div>
              <div class="show-bx-1 reagion ctSelect">
                <select name="Country" @change="onChangeCountry" class="">
                  <option value="" data-foo="">All Countries </option>
                  <option
                    :selected="country.name == filters.location_country"
                    :data-foo="country.name"
                    v-for="country in countries"
                    :id="country.pk_countries_id"
                    :key="country.name"
                    :value="country.pk_countries_id"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="cst-bx-v-1">
              <div class="show-bx-1  ctSelect reagion">
                <select
                  name="city"
                  id="city"
                  placeholder="City"
                  @change="onChangeCity"
                >
                  <option data-foo="" value="">Choose City </option>
                  <option
                    :selected="city.location == filters.location_city"
                    :data-foo="city.location"
                    v-for="city in cities"
                    :key="city.pk_countries_id"
                    :value="city.pk_countries_id"
                  >
                    {{ city.location }}
                  </option>
                </select>
              </div>
            </div>
            <div class="cst-bx-v-1" v-if="showArea">
              <div class="show-bx-1  ctSelect reagion">
                <select
                  name="area"
                  id="area"
                  placeholder="Area"
                  v-model="filters.location_area"
                  @change="onChangeArea()"
                >
                  <option value="">Choose Area </option>
                  <option
                    :selected="area.location == filters.location_area"
                    v-for="area in areas"
                    :key="area.pk_countries_id"
                    :value="area.location"
                  >
                    {{ area.location }}
                  </option>
                </select>
              </div>
            </div>
            <div class="secton-title">
              <h2>Search</h2>
              <button class="md-button md-theme-default filtertoggleboxBtn">
                <span class="material-icons">keyboard_arrow_up</span>
              </button>
            </div>

            <div class="show-bx-1 ctSelect filter-select">
              <select v-model="filters.market_type" @change="market_type()">
                <option value="">All Types</option>
                <option value="demand">Demand</option>
                <option value="supply">Supply</option>
              </select>
            </div>
            <div class="show-bx-1 ctSelect filter-select">
              <select @change="category">
                <option value="" data-foo="">All Categories</option>
                <option
                  :selected="category.name == filters.l1value"
                  :data-foo="category.name"
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  >{{ category.name }}</option
                >
              </select>
            </div>
            <div class="show-bx-1 ctSelect filter-select">
              <select v-model="filters.auto_type" @change="auto_type()">
                <option value="">Auto Type</option>

                <option value="new">New</option>
                <option value="old">Used </option>
              </select>
            </div>
            <div class="show-bx-1 ctSelect filter-select">
              <select v-model="filters.auto_purpose" @change="auto_purpose()">
                <option value="">Auto Purpose</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale </option>
              </select>
            </div>

            <div
              class="show-bx-1 ctSelect filter-select"
              v-if="showSubcategory"
            >
              <select @change="sub_category">
                <option value="" data-foo="">All Categories</option>
                <option
                  :selected="category.name == filters.l2value"
                  :data-foo="category.name"
                  v-for="category in sub_categories"
                  :key="category.id"
                  :value="category.id"
                  >{{ category.name }}</option
                >
                >
              </select>
            </div>
            <div class="show-bx-1 ctSelect filter-select" v-if="showThirdLevel">
              <select @change="ThirdLevel">
                <option value="" data-foo="">All Categories</option>
                <option
                  :selected="category.name == filters.l3value"
                  :data-foo="category.name"
                  v-for="category in ThirdLevels"
                  :key="category.id"
                  :value="category.name"
                  >{{ category.name }}</option
                >
                >
              </select>
            </div>
            <div class="show-bx-1 ranger">
              <div class="secton-title">
                <h2>Price</h2>
              </div>
              <Range @drag="filterPriceRange" />
            </div>
            <div class="show-bx-1" v-if="showYear">
              <div class="secton-title">
                <h2>Year</h2>
              </div>
              <div class="dropdown__popup dropdown__popup--opened false ">
                <div class="show-bx-1 area-size ctSelectDoubled">
                  <div class="breakk left">
                    <select
                      v-model="filters.year_from"
                      name="bathrooms"
                      @change="onChangeYearFrom($event)"
                    >
                      <option value="">Year from</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option>
                      <option value="2009">2009</option>
                      <option value="2008">2008</option>
                      <option value="2007">2007</option>
                      <option value="2006">2006</option>
                      <option value="2005">2005</option>
                      <option value="2004">2004</option>
                      <option value="2003">2003</option>
                      <option value="2002">2002</option>
                      <option value="2001">2001</option>
                      <option value="2000">2000</option>
                      <option value="1999">1999</option>
                      <option value="1998">1998</option>
                      <option value="1997">1997</option>
                      <option value="1996">1996</option>
                      <option value="1995">1995</option>
                      <option value="1994">1994</option>
                      <option value="1993">1993</option>
                      <option value="1992">1992</option>
                      <option value="1991">1991</option>
                      <option value="1990">1990</option>
                      <option value="1989">1989</option>
                      <option value="1988">1988</option>
                      <option value="1987">1987</option>
                      <option value="1986">1986</option>
                      <option value="1985">1985</option>
                      <option value="1984">1984</option>
                      <option value="1983">1983</option>
                      <option value="1982">1982</option>
                      <option value="1981">1981</option>
                      <option value="1980">1980</option>
                      <option value="1979">1979</option>
                      <option value="1978">1978</option>
                      <option value="1977">1977</option>
                      <option value="1976">1976</option>
                      <option value="1975">1975</option>
                      <option value="1974">1974</option>
                      <option value="1973">1973</option>
                      <option value="1972">1972</option>
                      <option value="1971">1971</option>
                      <option value="1970">1970</option>
                      <option value="1969">1969</option>
                      <option value="1968">1968</option>
                      <option value="1967">1967</option>
                      <option value="1966">1966</option>
                      <option value="1965">1965</option>
                      <option value="1964">1964</option>
                      <option value="1963">1963</option>
                      <option value="1962">1962</option>
                      <option value="1961">1961</option>
                      <option value="1960">1960</option>
                      <option value="1959">1959</option>
                      <option value="1958">1958</option>
                      <option value="1957">1957</option>
                      <option value="1956">1956</option>
                      <option value="1955">1955</option>
                      <option value="1954">1954</option>
                      <option value="1953">1953</option>
                      <option value="1952">1952</option>
                      <option value="1951">1951</option>
                      <option value="1950">1950</option>
                      <option value="1949">1949</option>
                      <option value="1948">1948</option>
                      <option value="1947">1947</option>
                      <option value="1946">1946</option>
                      <option value="1945">1945</option>
                      <option value="1944">1944</option>
                      <option value="1943">1943</option>
                      <option value="1942">1942</option>
                      <option value="1941">1941</option>
                      <option value="1940">1940</option>
                      <option value="1939">1939</option>
                      <option value="1938">1938</option>
                      <option value="1937">1937</option>
                      <option value="1936">1936</option>
                      <option value="1935">1935</option>
                      <option value="1934">1934</option>
                      <option value="1933">1933</option>
                      <option value="1932">1932</option>
                      <option value="1931">1931</option>
                      <option value="1930">1930</option>
                      <option value="1929">1929</option>
                      <option value="1928">1928</option>
                      <option value="1927">1927</option>
                      <option value="1926">1926</option>
                      <option value="1925">1925</option>
                      <option value="1924">1924</option>
                      <option value="1923">1923</option>
                      <option value="1922">1922</option>
                      <option value="1921">1921</option>
                      <option value="1920">1920</option>
                    </select>
                  </div>
                  <div class="breakk right">
                    <select
                      v-model="filters.year_to"
                      name="araea_size"
                      @change="onChangeYearTo($event)"
                    >
                      <option value="">Year to</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option>
                      <option value="2009">2009</option>
                      <option value="2008">2008</option>
                      <option value="2007">2007</option>
                      <option value="2006">2006</option>
                      <option value="2005">2005</option>
                      <option value="2004">2004</option>
                      <option value="2003">2003</option>
                      <option value="2002">2002</option>
                      <option value="2001">2001</option>
                      <option value="2000">2000</option>
                      <option value="1999">1999</option>
                      <option value="1998">1998</option>
                      <option value="1997">1997</option>
                      <option value="1996">1996</option>
                      <option value="1995">1995</option>
                      <option value="1994">1994</option>
                      <option value="1993">1993</option>
                      <option value="1992">1992</option>
                      <option value="1991">1991</option>
                      <option value="1990">1990</option>
                      <option value="1989">1989</option>
                      <option value="1988">1988</option>
                      <option value="1987">1987</option>
                      <option value="1986">1986</option>
                      <option value="1985">1985</option>
                      <option value="1984">1984</option>
                      <option value="1983">1983</option>
                      <option value="1982">1982</option>
                      <option value="1981">1981</option>
                      <option value="1980">1980</option>
                      <option value="1979">1979</option>
                      <option value="1978">1978</option>
                      <option value="1977">1977</option>
                      <option value="1976">1976</option>
                      <option value="1975">1975</option>
                      <option value="1974">1974</option>
                      <option value="1973">1973</option>
                      <option value="1972">1972</option>
                      <option value="1971">1971</option>
                      <option value="1970">1970</option>
                      <option value="1969">1969</option>
                      <option value="1968">1968</option>
                      <option value="1967">1967</option>
                      <option value="1966">1966</option>
                      <option value="1965">1965</option>
                      <option value="1964">1964</option>
                      <option value="1963">1963</option>
                      <option value="1962">1962</option>
                      <option value="1961">1961</option>
                      <option value="1960">1960</option>
                      <option value="1959">1959</option>
                      <option value="1958">1958</option>
                      <option value="1957">1957</option>
                      <option value="1956">1956</option>
                      <option value="1955">1955</option>
                      <option value="1954">1954</option>
                      <option value="1953">1953</option>
                      <option value="1952">1952</option>
                      <option value="1951">1951</option>
                      <option value="1950">1950</option>
                      <option value="1949">1949</option>
                      <option value="1948">1948</option>
                      <option value="1947">1947</option>
                      <option value="1946">1946</option>
                      <option value="1945">1945</option>
                      <option value="1944">1944</option>
                      <option value="1943">1943</option>
                      <option value="1942">1942</option>
                      <option value="1941">1941</option>
                      <option value="1940">1940</option>
                      <option value="1939">1939</option>
                      <option value="1938">1938</option>
                      <option value="1937">1937</option>
                      <option value="1936">1936</option>
                      <option value="1935">1935</option>
                      <option value="1934">1934</option>
                      <option value="1933">1933</option>
                      <option value="1932">1932</option>
                      <option value="1931">1931</option>
                      <option value="1930">1930</option>
                      <option value="1929">1929</option>
                      <option value="1928">1928</option>
                      <option value="1927">1927</option>
                      <option value="1926">1926</option>
                      <option value="1925">1925</option>
                      <option value="1924">1924</option>
                      <option value="1923">1923</option>
                      <option value="1922">1922</option>
                      <option value="1921">1921</option>
                      <option value="1920">1920</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="showAdvancedHeading"
              class="filter-select advanced-search d-flex"
              @click="toggleAdvancedSearch"
            >
              <h3>Advanced Search</h3>
              <span class="material-icons">
                {{ advSearchArrow }}
              </span>
            </div>
            <div v-if="isAdvanced">
              <div v-if="selectedCategory == 'Cars'">
                <div v-for="(feature, index) in features" :key="index">
                  <div v-if="feature.key == 'body_type'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Body Type</h2>
                      </div>
                      <div class="show-bx-1 auto-scrol-bx">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeBody_Type"
                            v-model="filters.body_type"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'doors'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Doors</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeDoors"
                            v-model="filters.doors"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'cylinders'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>No. of Cylinders</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeCylinders"
                            v-model="filters.cylinders"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'horsepower'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Horsepower</h2>
                      </div>
                      <div class="show-bx-1 auto-scrol-bx">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeHorsepower"
                            v-model="filters.horsepower"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'transmission_type'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Transmission Type</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeTransmission"
                            v-model="filters.transmission_type"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'colors'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Color</h2>
                      </div>
                      <div class="show-bx-1 auto-scrol-bx">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeColor"
                            v-model="filters.colors"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'warranty'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Warranty</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeWarranty"
                            v-model="filters.warranty"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'fuel_type'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Fuel Type</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChnageFueltype"
                            v-model="filters.fuel_type"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'regional_specs'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Regional Specs</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeRegion"
                            v-model="filters.regional_specs"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectedCategory == 'Boats'">
                <div v-for="(feature, index) in features" :key="index">
                  <div v-if="feature.key == 'age'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Age</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select
                          name="age"
                          @change="onChangeAge"
                          v-model="filters.age"
                        >
                          <option value=""></option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'body_condition'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Condition</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select
                          v-model="filters.body_condition"
                          @change="onChangeCondition"
                        >
                          <option value=""></option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'usage'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Usage</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select v-model="filters.usage" @change="onChangeUsage">
                          <option value=""></option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'length'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Length</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            v-model="filters.length"
                            @change="changeLength"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'warranty'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Warranty</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            v-model="filters.warranty"
                            @change="onChangeWarranty"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectedCategory == 'Accessories & Spare Parts'">
                <div v-for="(feature, index) in features" :key="index">
                  <div v-if="feature.key == 'mechanical_condition'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Condition</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select>
                          <option value=""></option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'usage'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Usage</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select>
                          <option value=""></option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectedCategory == 'Heavy Vehicles'">
                <div v-for="(feature, index) in features" :key="index">
                  <div v-if="feature.key == 'cylinders'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>No. of Cylinders</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            v-model="filters.cylinders"
                            @change="onChangeCylinders"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'horsepower'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Horsepower</h2>
                      </div>
                      <div class="show-bx-1 ">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeHorsepower"
                            v-model="filters.horsepower"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="feature.key == 'warranty'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Warranty</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeWarranty"
                            v-model="filters.warranty"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="feature.key == 'fuel_type'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Fuel Type</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChnageFueltype"
                            v-model="filters.fuel_type"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectedCategory == 'Motorcycles'">
                <div v-for="(feature, index) in features" :key="index">
                  <div v-if="feature.key == 'drive_system'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Final Drive System</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select
                          v-model="filters.drive_system"
                          @change="onChangeDrive"
                        >
                          <option value=""></option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'wheels'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Wheels</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select
                          v-model="filters.wheels"
                          @change="onChangeWheels"
                        >
                          <option value="">All Types</option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'usage'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Usage</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select v-model="filters.usage" @change="onChangeUsage">
                          <option value="">All Types</option>
                          <option
                            v-for="value in feature.values"
                            :key="value"
                            :value="value"
                            >{{ value }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'manufacturer'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Manufacturer</h2>
                      </div>
                      <div class="show-bx-1 auto-scrol-bx">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            v-model="filters.manufacturer"
                            @change="onChangeManufacturer"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'engine_size'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Engine Size</h2>
                      </div>
                      <div class="show-bx-1 ">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            v-model="filters.engine_size"
                            @change="onChangeEngine"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="feature.key == 'warranty'">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Warranty</h2>
                      </div>
                      <div class="show-bx-1">
                        <div
                          class="fltr-slct-bx"
                          v-for="value in feature.values"
                          :key="value"
                        >
                          <md-checkbox
                            @change="onChangeWarranty"
                            v-model="filters.warranty"
                            class="smallOption"
                            :value="value"
                            >{{ value }}</md-checkbox
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <button
            type="button"
            class="primaryControl ripple"
            @click="closeFilter"
            aria-label="Apply"
          >
            Apply
          </button>
        </footer>
      </div>
    </div>
  </div>
  <div class="md-layout-item" v-else>
    <BubbleLoader />
  </div>
</template>
<script>
import BubbleLoader from "../../pages/profileDashboard/components/loader";

import ctcarListingbox from "../../ctcomponents/autos/ctcarListingbox";
import { mapState } from "vuex";
import Range from "../../services/range";
import Search from "../search";
export default {
  name: "demands",
  data: () => ({
    filters: {
      page: 0,
      search: "",
      market_type: "",
      auto_type: "",
      auto_purpose: "",
      category: "",
      sub_category: "",
      model: "",
      min_price: "",
      max_price: "",
      location_country: "United Arab Emirates",
      location_city: "",
      location_area: "",
      year_from: "",
      year_to: "",
      age: "",
      body_condition: "",

      length: [],
      country_id: "",
      city_id: "",
      body_type: [],
      doors: [],
      cylinders: [],
      horsepower: [],
      transmission_type: [],
      colors: [],

      fuel_type: [],
      regional_specs: [],
      drive_system: "",
      wheels: "",
      usage: "",
      manufacturer: [],
      engine_size: [],
      warranty: [],
      offer_sort: "",
      price_sort: "",

      l1value: "",
      l1id: "",
      l2value: "",
      l2id: "",

      l3value: "",
      l3id: ""
    },
    showBubbleLoader: false,
    showMobileFilter: false,
    sort: "",
    showYear: false,
    showCity: false,
    showArea: false,
    countries: "",
    cities: "",
    areas: "",
    selectedOption: "",
    showSubcategory: false,
    showThirdLevel: false,
    showMake: false,
    showModel: false,
    selectedDropdown: "",
    showFilterLoader: false,
    categories: [],
    sub_categories: [],
    ThirdLevels: [],
    makes: [],
    models: [],
    showAdvancedHeading: false,
    isAdvanced: false,
    advSearchArrow: "arrow_drop_down",
    array: [],
    busy: false,
    showImage: false,
    showLoader: true,
    boolean: false,
    string: null,
    novalue: null,
    disabled: true,
    obj1: { name: "obj1" },
    obj2: { name: "obj2" },
    obj: null,
    indeterminate: true
  }),
  components: {
    BubbleLoader,
    ctcarListingbox,
    Range,
    Search
  },
  computed: {
    ...mapState({
      features: state => state.store.autoFeatures
    })
  },
  methods: {
    showMobile() {
      this.showMobileFilter = true;
    },
    closeFilter() {
      this.showBubbleLoader = true;
      setTimeout(() => {
        this.showBubbleLoader = false;
      }, 2000);
      this.showMobileFilter = false;
      this.$store.dispatch("ToggleHeader");
    },
    onChangeBody_Type() {
      this.filterPage();
    },
    onChangeDoors() {
      this.filterPage();
    },
    onChangeCylinders() {
      this.filterPage();
    },
    onChangeHorsepower() {
      this.filterPage();
    },
    onChangeTransmission() {
      this.filterPage();
    },
    onChangeColor() {
      this.filterPage();
    },
    onChnageFueltype() {
      this.filterPage();
    },
    onChangeAge() {
      this.filterPage();
    },
    onChangeCondition() {
      this.filterPage();
    },
    onChangeUsage() {
      this.filterPage();
    },
    changeLength() {
      this.filterPage();
    },
    onChangeWarranty() {
      this.filterPage();
    },
    onChangeDrive() {
      this.filterPage();
    },
    onChangeWheels() {
      this.filterPage();
    },
    onChangeManufacturer() {
      this.filterPage();
    },
    onChangeEngine() {
      this.filterPage();
    },

    onChangeRegion() {
      this.filterPage();
    },

    OnCLickSortPrice(value) {
      switch (value) {
        case "phtl":
          this.filters.price_sort = "htl";
          this.filters.offer_sort = "";

          break;
        case "plth":
          this.filters.price_sort = "lth";
          this.filters.offer_sort = "";

          break;
        case "ohtl":
          this.filters.offer_sort = "htl";
          this.filters.price_sort = "";

          break;
        case "olth":
          this.filters.offer_sort = "lth";
          this.filters.price_sort = "";

          break;
        case "":
          this.filters.offer_sort = "";
          this.filters.price_sort = "";

        default:
          break;
      }

      this.filterPage();
    },

    onChangeCountry(event) {
      const id = event.target.value;
      this.filters.country_id = id;
      if (event.target.options.selectedIndex > -1) {
        const value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.location_country = value;
        if (value != "") {
          this.getCity("city", id);
        } else {
          this.filters.city_id = "";
          this.filters.location_city = "";
          this.filters.location_area = "";
          this.showCity = false;
          this.showArea = false;
        }
      }

      this.filterPage();
    },
    onChangeCity(event) {
      const id = event.target.value;
      this.filters.city_id = id;
      if (event.target.options.selectedIndex > -1) {
        const value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.location_city = value;
        if (value != "") {
          this.getCity("area", id);
          this.showArea = true;
        } else {
          this.filters.location_area = "";
          this.showArea = false;
        }
      }

      this.filterPage();
    },
    getCity(type, id) {
      this.$store
        .dispatch("GET_CITY", id)
        .then(response => {
          if (type == "city") {
            if (response.data.success == true) {
              this.cities = response.data.result;
            } else {
            }
          } else {
            if (response.data.success == true) {
              this.showArea = true;
              this.areas = response.data.result;
            } else {
            }
          }
        })
        .catch(error => console.log(error));
    },
    getCountry() {
      this.$store
        .dispatch("GET_COUNTRY")
        .then(response => {
          this.countries = response.data.result;
        })
        .catch(error => console.log(error));
    },
    onChangeArea() {
      this.filterPage();
    },
    onChangeYearFrom() {
      this.filterPage();
    },
    onChangeYearTo() {
      this.filterPage();
    },
    filterPriceRange(min, max) {
      this.filters.min_price = min.toString();
      this.filters.max_price = max.toString();
      this.filterPage();
    },
    toggleAdvancedSearch() {
      this.isAdvanced = !this.isAdvanced;
      if (this.advSearchArrow == "arrow_drop_down") {
        this.advSearchArrow = "arrow_drop_up";
      } else {
        this.advSearchArrow = "arrow_drop_down";
      }
    },
    filterPage() {
      this.filters.page = 0;
      this.loadMore();
      let urlFilter = {};
      Object.keys(this.filters).forEach(key => {
        let topic = this.filters[key];
        if (topic.length) {
          urlFilter[key] = topic;
        }
      });

      this.$router.push({ query: urlFilter });
    },
    market_type() {
      this.filterPage();
    },
    auto_purpose() {
      this.filterPage();
    },
    auto_type() {
      this.filterPage();
    },
    SearchData(name) {
      console.log(name);
      if (name == undefined) {
        this.filters.search = "";
      } else {
        this.filters.search = name;
      }
      this.filterPage();
    },
    clearFilters() {
      this.filters.year_from = "";
      this.filters.year_to = "";
      this.filters.age = "";
      this.filters.body_condition = "";

      this.filters.length = [];

      this.filters.body_type = [];
      this.filters.doors = [];
      this.filters.cylinders = [];
      this.filters.horsepower = [];
      this.filters.transmission_type = [];
      this.filters.colors = [];
      this.filters.fuel_type = [];
      this.filters.regional_specs = [];
      this.filters.drive_system = "";
      this.filters.wheels = "";
      this.filters.usage = "";
      this.filters.manufacturer = [];
      this.filters.engine_size = [];
      this.filters.warranty = [];
    },
    category(event) {
      this.clearFilters();

      this.filters.sub_category = "";
      this.filters.model = "";
      this.filters.l1value = "";
      this.filters.l1id = "";
      this.filters.l2value = "";
      this.filters.l2id = "";
      this.filters.l3value = "";
      this.filters.l3id = "";
      this.isAdvanced = false;
      const id = event.target.value;
      this.filters.l1id = id;
      if (event.target.options.selectedIndex > -1) {
        const value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.category = value;
        this.selectedCategory = value;
        if (value != "") {
          this.filters.l1value = value;
          this.loadCategory(id);
          this.loadFeatures(id);
        } else {
          this.filters.l1value = "";
          this.showYear = false;
          this.showAdvancedHeading = false;
        }
        if (
          value == "Cars" ||
          value == "Heavy Vehicles" ||
          value == "Motorcycles"
        ) {
          this.showYear = true;
        } else {
          this.showYear = false;
        }
      }
      this.showSubcategory = false;
      this.showThirdLevel = false;

      this.sub_categories = [];
      this.ThirdLevels = [];
      this.selectedDropdown = "category";

      this.filterPage();
    },
    sub_category() {
      this.selectedDropdown = "sub_category";
      const id = event.target.value;
      this.filters.l2id = id;
      if (event.target.options.selectedIndex > -1) {
        const value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.sub_category = value;
        if (value != "") {
          this.filters.l2value = value;
          this.loadCategory(id);
        } else {
          this.filters.l2value = "";
          this.filters.l3value = "";
          this.showThirdLevel = false;
          this.filters.model = "";
        }
      }

      this.filterPage();
    },
    ThirdLevel() {
      this.selectedDropdown = "third_level";
      const id = event.target.value;
      if (event.target.options.selectedIndex > -1) {
        const value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        if (value != "") {
          this.filters.model = value;
          this.filters.l3value = value;
        } else {
          this.filters.l3value = "";
          this.filters.model = value;
        }
      }

      this.filterPage();
    },

    model() {
      this.selectedDropdown = "model";
      this.filterPage();
    },
    market_type() {
      this.filterPage();
    },
    loadMore() {
      this.filters.page++;
      console.log("loadmore");
      if (this.$route.params.id) {
        const id = this.$route.params.id;
        this.filters.profileid = id;
      }
      this.showLoader = true;
      this.busy = true;

      this.$store
        .dispatch("LoadAutos", this.filters)
        .then(response => {
          this.showLoader = false;
          if (response.success) {
            this.busy = false;
          } else if (response.success == false && this.filters.page == 1) {
            this.showImage = true;
          }
        })

        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    },
    loadCategory(id) {
      this.showFilterLoader = true;
      this.$store
        .dispatch("loadCategoryType", id)
        .then(response => {
          this.showFilterLoader = false;
          const { result, success } = response;
          if (this.selectedDropdown == "category") {
            this.sub_categories = result;
            this.showSubcategory = true;

            this.showAdvancedHeading = true;
            if (success == false) {
              this.showSubcategory = false;
            }
          } else if (this.selectedDropdown == "sub_category") {
            this.ThirdLevels = result;
            if (success == true) {
              this.showThirdLevel = true;
            } else {
              this.showThirdLevel = false;
            }
          }

          // else if (this.selectedDropdown == "third_level") {
          //   this.models = result;
          // }
          else {
            this.categories = result;
          }
        })
        .catch(error => console.log(error));
    },
    loadFeatures(id) {
      this.$store.dispatch("loadAutoFeatures", id);
    },
    getOnLoadSubcategory(id) {
      this.$store
        .dispatch("loadCategoryType", id)
        .then(response => {
          const { result, success } = response;
          this.sub_categories = result;
          this.showSubcategory = true;

          this.showAdvancedHeading = true;
        })
        .catch(error => console.log(error));
    },

    getOnLoadThirdcategory(id) {
      this.$store
        .dispatch("loadCategoryType", id)
        .then(response => {
          const { result, success } = response;
          this.third_categories = result;
          this.ThirdLevels = result;
          if (success == true) {
            this.showThirdLevel = true;
          } else {
            this.showThirdLevel = false;
          }
        })
        .catch(error => console.log(error));
    },
    loadurlData() {
      Object.keys(this.$route.query).forEach(key => {
        if (Object.keys(this.filters).includes(key)) {
          let query = this.$route.query[key];

          switch (key) {
            case "country_id":
              this.getCity("city", query);
              this.showCity = true;
              break;
            case "city_id":
              this.getCity("area", query);
              this.showArea = true;
              break;
            case "category":
              this.selectedCategory = query;
              break;

            default:
              break;
          }
          if (key == "offer_sort") {
            this.sort = "o" + query;
          }
          if (key == "price_sort") {
            this.sort = "p" + query;
          }
          if (key == "l1id") {
            this.showSubcategory = true;
            this.getOnLoadSubcategory(query);
            this.loadFeatures(query);
          }
          if (key == "l2id") {
            this.showThirdLevel = true;
            this.getOnLoadThirdcategory(query);
          }
          if (
            typeof this.filters[key] == "string" ||
            typeof this.filters[key] == "number" ||
            typeof this.filters[key] == "boolean"
          ) {
            this.filters[key] = query;
          } else {
            this.filters[key] = Array.isArray(query) ? query : [query];
          }
          if (
            key == "age" ||
            key == "wheels" ||
            key == "warranty" ||
            key == "engine_size" ||
            key == "usage" ||
            key == "manufacturer" ||
            key == "colors" ||
            key == "fuel_type" ||
            key == "regional_specs" ||
            key == "drive_system" ||
            key == "body_condition" ||
            key == "length" ||
            key == "body_type" ||
            key == "doors" ||
            key == "cylinders" ||
            key == "horsepower" ||
            key == "transmission_type"
          ) {
            this.isAdvanced = true;
            this.advSearchArrow = "arrow_drop_up";
          }
        }
      });
      if (
        this.filters.category == "Cars" ||
        this.filters.category == "Heavy Vehicles" ||
        this.filters.category == "Motorcycles"
      ) {
        this.showYear = true;
      } else {
        this.showYear = false;
      }
    }
  },
  created() {
    this.loadurlData();
    this.loadMore();
    this.loadCategory();
    this.getCountry();
    this.getCity("city", 1);
    // if (this.filters.sub_category == "") {
    //   this.isAdvanced = false;
    // } else {
    //   this.isAdvanced = true;
    // }
  }
};
</script>
<style scoped>
.ctSelectDoubled {
  margin-bottom: 13px;
}
.search {
  padding: 0 10px;
}
.search input {
  width: 100%;
  padding: 6px;
  outline-width: 0;
}
.advanced-search {
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
}
.advanced-search:hover {
  color: #524b4b;
}
.image-wrap {
  padding: 20px 0;
}
.nodata {
  text-align: center;
  color: #616161;
  font-weight: bolder;
}
.no-data-img {
  height: 400px;
  display: block;
  margin: 0px auto;
}
.filter-select {
  margin-bottom: 13px;
}
.ranger .vue-range-slider {
  margin: 20px 0px;
}
.reagion {
  margin-bottom: 14px;
}
.area-size {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.loader {
  position: relative;
  right: 0;
}

.circle-loader {
  position: relative;
  /* bottom: 0; */
  top: 12px;
  margin: 0px auto;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media screen and (max-width: 768px) {
  .secton-title button {
    display: none;
  }
  .ctSelect {
    width: 93% !important;
  }
  .search-filter-mobile-wrapper .facetsWrapper {
    margin-top: 50px;
  }
  .ch-left-layout {
    display: none;
  }
  .lst-bx-wrp {
    margin-left: -25px;
    margin-right: -25px;
  }

  .ctSelect select,
  .ctSelectDoubled select {
    font-size: 11px !important;
  }

  .spn-tp-121 {
    font-size: 16px;
  }
}

@media screen and (max-width: 600px) {
  .lst-bx-wrp {
    margin-left: 10px;
    margin-right: 10px;
  }
  .listItemShow {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(143px, 1fr)) !important;
  }
  .switchView {
    margin-right: 6px !important;
  }
  .filter_products i {
    margin-right: 4px !important;
  }
  .spn-tp-121 {
    font-size: 14px;
    margin-top: 8px !important;
  }
}
@media screen and (max-width: 300px) {
  .ch-main-layout {
    padding-right: 40px;
  }

  .ctSelect {
    width: 100% !important;
    margin-top: 16px;
  }

  .filter_products {
    position: absolute;
    right: 8px;
  }

  .bx-tp-12-ch {
    position: relative;
  }
  .topPos {
    position: absolute;
    right: 50px;
  }
}
</style>
