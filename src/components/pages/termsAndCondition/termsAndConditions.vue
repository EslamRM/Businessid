<template>
  <div>
    <div class="container-fluid pzero_mob">
      <div class="container container_mob">
        <div class="col-sm-12 p-0 fl">
          <div class="col-sm-12 col-md-12 col-xl-8 wrap_intro  wrapper_payment_card">
            <center>
              <h2>Terms And Conditions</h2>
            </center>
            <p class="dynamic-content">Agreement of Registration/Membership in the platform of <b class="arrow">BUSINESSID</b>. This Registration / Membership Agreement is entered into by and between: <b class="arrow">BUSINESSID</b> As the owner of the PLATFORM site commercial address is registered in <b class="arrow">UAE , DUBAI</b>
            </p>
            <p class="dynamic-content">
              Hereinafter referred to as the (first party / platform)
            </p>
            <p class="dynamic-content">And</p>
            <p class="dynamic-content wrap_intro">
              <b class="arrow">{{name ? name : blank}}</b> with license number <b class="arrow"> {{license_number ? license_number : blank}} </b>. <span v-if="user_type === 'company' || user_type === 'admin' || user_type === 'trade'">
                Its commercial address is registered in <b class="arrow"> {{city ? city : blank}} </b> represented by <b class="arrow"> {{owner_name ? owner_name : blank}} </b> as <b class="arrow"> {{designation ? designation : blank}} </b> Hereinafter referred to as the (Second / Trader/ Personal / Staff / Business man / Business woman)
              </span>
            </p>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro">
                Introduction and Definitions
              </h3>

              <ul class="fl">
                <li>
                  <strong>Businessid portal </strong> is a
                  company that provides online store service and services
                  related to electronic commerce in the United Arab Emirates and
                  the Arab Gulf region. This includes the website, application
                  and online store, which is the store that is used by the
                  trader in the platform and through which the commercial
                  activity is done.
                </li>

                <li>
                  <strong>Company/Business man/ business woman </strong> is the person who registers on the
                  platform (mention of the name of the platform) in order to use
                  the online store, and this includes any person who uses the
                  platform for his commercial activity, if it is goods or
                  services.
                </li>
                <li><strong>Staff Account/ it can be used as a personal account in addition its manage some of sections in company account</strong></li>
                <li>
                <li><strong>Owner account is the admin and he is the authorize person by the law who can control the company account </strong></li>
                <li>
                  <strong>Consumer/ personal </strong> is any person who uses the stores by purchasing or dealing with services through the platform.
                </li>
                <li><strong>Freelancer sales/marketer is the person who upgrade his account from personal account to freelancer, to sell products or services for company accounts based on commissions </strong></li>
                <li>
                  <strong>Agreement</strong> means the rules and conditions used
                  on the platform that apply to each of the online store (the
                  platform), the trader and the consumer
                </li>

                <li>
                  <strong>Service provider </strong> is the services provided by
                  the platform and in partnership with any third party.
                </li>

                <strong class="mt_title">Based on the foregoing, both the first and second parties
                  agreed as follows:</strong>

                <div class="col-sm-12 p-0 fl mt_title">
                  <strong class="underline">First-</strong> The above
                  introduction is an integral part of this agreement
                </div>
              </ul>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Second - the company/business man legal eligibility
              </h3>
              <span>
                <ul>
                  <li>
                    The company/business man/ business woman shall be legally qualified and at least 18 years old.
                  </li>
                  <li>
                    A business man/ business woman who is less than 18 years old is exempted if he proves his ownership of the business.
                  </li>
                  <li>
                    In the event that a person is registered as a company or another party, he shall prove his legal capacity to practice the business.</li>
                  <li>
                    In the event that he violates this section of the agreement, the trader bears the consequences of the violation, as the platform has nothing to do with commercial dealings and we have the right on the platform to claim compensation for damages that may be as a result of this violation.
                  </li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Third - the type of commitment in the platform
              </h3>
              <span>
                <ul>
                  <li>
                    The platform is a provider of online store services and this
                    means that its commitment is only in operating the online store
                    and helping the trader to provide his services to the customer
                    through the online store.
                  </li>
                  <li>
                    The first party can offer a financial compensation other than
                    those mentioned in this agreement or its annexes. Other services
                    related, for example e-commerce from matters of marketing and
                    guidance to the trader. The first party can rent advertising
                    space in the platform, promote its goods or service, or
                    photography or videography and the like.
                  </li>
                  <li>
                    With the exception of the obligations contained in this
                    agreement and in the absence of any agreement to the contrary,
                    The platform shall have no obligation in relation to the sale
                    and purchase of the public, As the platform is not responsible
                    for commercial dealings between the trader who is a member of
                    the platform and the consumer.
                  </li>
                  <li>
                    No person has the right to use the platform if his or her
                    membership or store is terminated or canceled according to court
                    orders or rulings.
                  </li>
                  <li>
                    All merchants shall comply with all applicable laws to regulate
                    electronic commerce & the system of information crimes,
                    investment and electronic transactions force in the United Arab
                    Emirates.
                  </li>
                  <li>
                    In the event that the trader applying for the request is an
                    individual, He shall commit to verify and submit the required
                    conditions with the official authorities and shall acknowledge
                    compliance with these requirements.
                  </li>
                  <li>
                    In the event that the applicant represents a corporation or a
                    company, He shall provide the platform with all the details and
                    information that proves this.
                  </li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Fourth - Obligations to register and create accounts
              </h3>
              <span>
                <ul>
                  <li>
                    The second party is obligated to disclose some information and choose a username and password in order to use it to enter and access the platform's services. Work will be made to verify the activity of the second party's account, and after making sure of this and activating his account, he will become used and able to access and enjoy the services of the platform. <br> Accordingly, the second party is obligated to carry out the following:
                  </li>
                  <li>
                    He shall be responsible for the confidentiality of his account information and not to disclose the login data to any other person, and in the event of an attempt to enter the platform, he shall inform the platform of that attempt.
                  </li>
                  <li>The platform is not responsible for any material or moral damage and loss that occurs as a result of the loss of access data for the second party.</li>
                  <li>
                    The second party is fully responsible for using his account on the platform, and in the event that he authorizes another person to do so, The platform disclaims its responsibility for that access to the account.
                  </li>
                  <li>
                    The second party shall prove a high level of seriousness and credibility in using his account on the platform and adhering to the rules of use, privacy and all legal provisions in force in the United Arab Emirates and the Arab Gulf region.
                  </li>
                  <li>
                    The second party is obligated to disclose the true and correct information related to it as required of it during registration on the platform. It is also obligated to update its data in case it is actually changed.
                  </li>
                  <li>
                    The first party is obligated to maintain the confidentiality of the second party’s information in accordance with the provisions of the first party’s privacy policy.
                  </li>
                  <li>
                    The first party operating the platform has the right to Shut- down the activity of the second party and cancel its membership in the event that the conditions for entering and updating data on the platform are violated or disclosure of incorrect information in violation of what is stated in this agreement or any other agreement attached to it.
                  </li>
                  <li>
                    The first party has the right to conduct some investigations that we deem necessary, whether directly or through a third party, and we have the right to demand the disclosure of some additional information or other documents.
                  </li>
                  <li>
                    The first party has the right to delete any account that is not confirmed or has not performed any transaction for a long period of more than (two years).
                  </li>
                  <li><strong>The second party agrees that:</strong> </li>
                  <li>The platform may make any modifications to the terms of use, and the platform will inform him of these modifications when they are made.</li>
                  <li>
                    Provided that the platform makes amendments to the terms of use without incurring any legal liability and that users will be notified of these modifications.
                  </li>
                  <li>
                    If there is any objection to any amendment to the terms of use, this may prevent access to the store. Therefore, in the event that the second party objects to any amendment to the terms of use, he shall stop using the services and access the account because once he enters the account again, this means his approval of the amendments. It can communicate with the first party to answer his inquiries regarding this agreement.
                  </li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Fifth - payment services to stores on the platform
              </h3>
              <span>
                <ul>
                  <li>
                    The consumer can pay on the platform through the payment methods available to us on the site, which are made online .
                  </li>

                  <li>
                    The platform has nothing to do with the cash on delivery system, as it is related to the company and the consumer.
                  </li>
                  <li>The platform has the right to stipulate that the payment process be direct between the company and the consumer, and we have no relationship with that process. We are in the platform.</li>
                  <li>The company shall determine the price of the products and goods according to their market value, and we have nothing to do with that pricing.</li>
                  <li>The company shall present invoices and receipts and receipts for all amounts obtained from the store in addition to the type of merchandise, the quantity, its description and its value. This is for its commercial, economic and legal interest.</li>
                  <li>On the platform, we have the right to freeze and prevent the completion of any payment process that violates the provisions of the terms of use, or to cancel any purchase or sale that results from a technical error that we have that leads to a difference in the displayed price from its market value, and we on the platform are not responsible for those amounts.</li>
                  <li>The second party has the right to cancel, amend or change any payment method on the platform.Unless agreed to the contrary, all fees are calculated in the UAE dirham, and this is the currency in which the platform is dealt.</li>
                  <li>The first party has the right to add, reduce or deduct any fees based on prior notice to the second party.</li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Sixth - the rights of the platform
              </h3>
              <span>
                <ul>
                  <li>All the content of the electronic platform and others are the property of the first party, and no person has the right to use it in any way, and the first party will take the necessary measures in the event of infringement of any of the rights of the platform and its intellectual property.</li>
                  <li>The first party / platform is not responsible for any infringement of the rights of traders.</li>
                  <li>Neither the second party / the company nor any user shall acquire any ownership, copyrights, or any other right in Platform C under this agreement, subscription, or any agreement or arrangement concluded between the merchant and any user of the platform (the consumer).</li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Seventh - Consumer Rights
              </h3>
              <span>
                <ul>
                  <li>The consumer has the right to inform upon receipt of different goods or upon non-receipt of the goods when he has completed the payment process through the platform and we have the right to take appropriate action.</li>
                  <li> The consumer has the right to review the goods before receiving to ensure their correctness, safety and conformity, and the platform will not be responsible for the relationship between the merchant/vendor and the consumer.</li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Eighth - The responsibility of the first party / platform
              </h3>
              <span>
                <ul>
                  <li><strong>The platform will not be held responsible in any way:</strong></li>
                  <li>For any unsatisfactory performance by the merchant, shipping companies, payment gateways, or the consumer’s failure to pay, nor any losses or malfunctions.</li>
                  <li>For any errors, whether direct, indirect, or through a third party.</li>
                  <li>For any claims arising as a result of financial losses or discrediting misuse of the platform.</li>
                  <li>For any claim, dispute, damages or loss, direct or indirect, to any party as a result of using one of the platform users.</li>
                  <li>For any illegal activity carried out by the merchant, and the merchant shall inform the platform of any suspicious activity on the platform.</li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Ninth - strategic or logistical services
              </h3>
              <span>
                <ul>
                  <li> According to the rules and provisions of this registration / membership agreement, the Businessid platform may provide some strategic or logistical services through a third party or third parties, and these services may be, for example, but not limited to: Services of shipping companies and the delivery of products and goods .</li>
                  <li>The Businessid platform is not fully responsible, directly or indirectly, for any actions taken by any third party and that what you do is merely a link between the user and the service provider (the third party).</li>
                  <li>The request for a third-party service is not mandatory, but this matter is due to the desire and need of the user, and when the trader uses the third-party services available at the Businessid platform, the Businessid platform disclaims its responsibility for this relationship and this relationship has its independent provisions that are made between the trader and the third party.</li>
                  <li>Some strategic and logistical service providers set their own requirements or costs and the Businessid platform does not have any authority over these requirements or these costs. Therefore, the Businessid platform advises merchants registered with it to review the terms of the service provider (the third party) and the costs of its services before confirming the service request.</li>
                  <li>In the event that the user submits a request for a service provided by a (third party), then the user in this manner authorizes the Businessid platform and grants its permission to provide the service provider (the third party) with the user's personal data that he requests, and other data that the service provider (the third party) needs, and that is In accordance with the rules and provisions of the privacy policy and the confidentiality of information in force at the platform <span class="arrow">BUSINESSID</span>.</li>
                  <li>Some of the services provided by (third parties) on Businessid platform which the trader benefits from through policies issued by agreement between the service provider and Businessid platform, so it shall be used by the Businessid The Businessid platform may deduct some costs from it in implementation of the agreement between the Businessid platform and the service provider (third parties), The Businessid platform does not bear any responsibility resulting from the service provider’s failure to provide any services.</li>
                  <li>The second party does not receive the value of his goods until 20 days after the goods are delivered to the consumer to ensure the safety of the goods and that they comply with the specifications and standards presented on the platform.</li>

                  <li> In the event of the consumer complaining and returning the goods to the second party, the delivery company is entitled to claim the amount of the return cost from the second party.</li>

                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Tenth - Quality of service targeted by the trader and specified
              </h3>
              <span>
                <ul>
                  <li>As stated in the attached Appendix (A).</li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Eleventh - cancel or terminate the membership or store agreement
              </h3>
              <span>
                <ul>
                  <li>The first party has the right to immediately terminate this agreement in the event that its rules and provisions are violated, including, but not limited to, in the event of an activity in violation of the law for political, religious, ethnic, immoral or sexual purposes, or the promotion of narcotic substances and the like.</li>
                  <li>The first party has the right to cancel the membership immediately and preserve its legal rights towards the second party.</li>
                  <li>The first party has the right to cancel the membership of the second party without referring to him in the event of complaints from the consumer or from the competent government agencies in the country in which the second party is located.</li>
                  <li>The two parties are also entitled, by means of a termination letter directed by either of them, to terminate this agreement at the address mentioned in the introduction above, not less than two months before the date of termination specified in the termination letter. Neither party is entitled to claim any compensation of any kind as a result of the termination decision.</li>
                  <li>Provided that the second party is obligated to pay a fee that costs the cancellation process, which is 500 dirhams (five hundred dirhams). </li>
                  <li>Upon termination, each of the two parties, for whatever reason, will settle the account between them in good faith.</li>
                </ul>

              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Twelfth - Limits of Liability
              </h3>
              <span>
                <ul>
                  <li>In no case, the company (including its officials, directors, employees, agents, representatives, suppliers and affiliated companies) does not bear any responsibility (jointly or partially) towards the company/business man , business woman or any user or any third party for any party or other parties.</li>
                  <li>Including, without limitation, any special, exemplary, punitive or consequential damages, loss of profits, damages resulting from lost time or good reputation, business interruption, or data loss, regardless of the basis of this liability.</li>
                  <li>It is contractual or legal, arising out of or related in any way to the use, access to, accreditation or inability to use or improper use of the platform or mobile phone application, services or programs or any information, content or materials available through the platform or the mobile application Or the services or program associated with the platform.</li>
                  <li>The maximum and exclusive liability of the platform / company (including its officials, directors, employees, agents, representatives, suppliers, and affiliated companies) for all damages, losses, claims, and causes of action under this agreement or under the damage (including, but not limited to, negligence, or otherwise That), the total amounts paid to the first party for the previous three (3) months prior to the procedure that led to such damages, losses, lawsuits, or the causes of the lawsuit cannot exceed the sum established by an amicable settlement or a final and final court ruling.</li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Thirteenth - Force Majeure
              </h3>
              <span>
                <ul>
                  <li>For the purposes of this agreement, a “force majeure event” means (1) the occurrence of unforeseen circumstances beyond the control of a party and without this party’s negligence or willful misconduct, including, but not limited to, any act by any governmental authority, an act of war. Or terrorism, natural disaster, strike, boycott, embargo, shortage, riot, closure, labor dispute, civil unrest and (2) the seller’s failure to provide his services to the company in a timely manner. </li>
                  <li>Regardless of anything to the contrary mentioned in this agreement, no party will be responsible for any failure to perform any of its obligations under this agreement, other than the monetary obligation, if it is due, due to the event of force majeure.</li>
                  <li>A party claiming a force majeure event shall make reasonable efforts to mitigate the impact of any force majeure event and cooperate to develop and implement a possible treatment plan.</li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro margin_title">
                Fourteenth - governing law and jurisdiction
              </h3>
              <span>
                <ul>
                  <li>This Agreement shall be governed and construed in accordance with the laws of the United Arab Emirates, without regard to conflict of laws provisions. Any dispute arising under or in relation to this agreement will be resolved only by the competent court in the Emirate of Dubai, and the parties hereby irrevocably submit to the exclusive jurisdiction of this court.</li>
                  <li>This agreement made in two original copies, and each party has received copies to act accordingly. </li>
                </ul>
              </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_party">
              <span class="fl margin_title">First Party </span>
              <span class="fr margin_title">Second Party </span>
            </div>

            <div class="col-sm-12 p-0 fl wrap_intro">
              <h3 class="col-sm-12 p-0 fl title_intro no_underline margin_title">
                Appendix A
              </h3>
              <br />
              <span>
                The second party has the right to choose the services and facilities provided by the first party to subscribe to the platform, according to the offer shown below:
                <div class="col-sm-12 p-0 fl wrap_party party_option">
                  <span>First option:</span> Annual subscription of 2,500 AED, or <br />
                  <span> Second option: </span> Monthly installments subscription of 300 AED
                  <br /><br />
                  The settlement and clearing of the account between the two parties shall take place periodically and monthly according to the account statements approved by them.<br />
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TermsAndConditions",
  props: {
    user_type: {
      default: 'company'
    },
    name: String,
    license_number: {
    },
    city: String,
    owner_name: String,
    designation: String
  },
  data () {
    return {
      blank: "_________"
    }
  }
}
</script>
<style scoped>
.dynamic-content {
  line-height: 2em;
}
.arrow {
  /* font-weight: 100; */
  font-weight: 600;
  text-decoration: underline;
}
.wrapper_payment_card {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  margin: auto;
  padding: 25px;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow: hidden;
  /* overflow: scroll; */
}

.wrapper_payment_card h1 {
  color: #4c98d1;
  font-size: 18px;
  margin-bottom: 25px;
  text-align: center;
  float: left;
}

.wrapper_payment_card h3 {
  color: #535559;
  font-size: 14px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 17px;
  text-align: center;
  margin-bottom: 5px;
  line-height: 30px;
}

.wrapper_payment_card strong {
  color: #535559;
  font-size: 14px;
  font-weight: 600;
}

.title_intro {
  color: #535559;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
  text-align: left;
}

.wrap_intro {
  text-align: justify;
}
.wrap_intro h3 {
  text-align: left;
}

.wrap_intro li {
  text-align: justify;
  /* margin-top: 20px; */
  margin-top: 12px;
  line-height: 20px;
}
.wrap_intro strong {
  color: #535559;
  font-size: 14px;
  font-weight: 700;
}

.wrap_intro span {
  line-height: 28px;
  color: #535559;
  text-align: justify;
}
.wrap_intro span ul {
  line-height: 28px;
  color: #535559;
  text-align: justify;
  list-style-type: disc;
}

.mt_title {
  margin-top: 10px;
  float: left;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.underline {
  text-decoration: underline;
}

.wrap_party span {
  color: #535559;
  font-size: 14px;
  font-weight: 700;
}

.no_underline {
  text-decoration: none;
}

.margin_title {
  margin-top: 8px !important;
  margin-bottom: 1px !important;
}

@media screen and (max-width: 768px) {
  .wrapper_payment_card {
    padding: 20px;
    margin-top: 30px;
    margin-bottom: 80px;
  }
  .container {
    padding: 0px;
  }
  .wrapper_payment_card h3 {
    font-size: 12px;
  }

  .wrapper_payment_card strong {
    font-size: 12px;
  }
  .wrap_intro li {
    font-size: 12px;
    margin-top: 0px;
  }

  .wrapper_payment_card h3 {
    line-height: 22px;
  }
  .wrap_intro span {
    line-height: 22px;
  }

  .mt_title {
    font-size: 12px;
  }

  .wrap_intro span {
    font-size: 12px;
  }

  .wrap_party span {
    font-size: 12px;
  }
}

@media screen and (max-width: 600px) {
  .wrapper_payment_card {
    /* padding: 10px; */
    padding: 16px;
    margin-top: 5px;
    margin-bottom: 50px;
  }
  .pzero_mob {
    padding: 10px;
  }
  .wrapper_payment_card h3 {
    font-size: 12px;
    line-height: 21px;
    width: 100%;
  }
  .wrapper_payment_card strong {
    font-size: 12px;
    line-height: 20px;
  }
  .wrap_intro li {
    margin-top: 2px;
  }

  .wrap_intro li {
    font-size: 11px;
  }
  .wrap_intro span {
    line-height: 20px;
    font-size: 11px;
  }
  .wrap_party {
    width: 100%;
  }
  .wrap_party span {
    font-size: 12px;
  }

  br {
    display: none;
  }

  .party_option span {
    width: 100%;
    margin-top: 10px;
    float: left;
  }

  .mt_title {
    font-size: 12px;
  }
  .margin_title {
    margin-top: 6px !important;
  }
}

@media screen and (max-width: 300px) {
  .mt_title {
    font-size: 11px;
  }
  .container {
    padding: 0px;
    padding-right: 40px !important;
  }
  .wrapper_payment_card h3 {
    font-size: 11px;
    line-height: 18px;
  }
  .wrapper_payment_card strong {
    font-size: 11px;
    line-height: 18px;
  }
  .wrap_intro li {
    font-size: 10px;
  }

  .wrap_intro span {
    line-height: 19px;
    font-size: 11px;
  }

  .wrap_party span {
    font-size: 11px;
  }
}
</style>
