import './home.css'
import {useEffect, useState} from "react";
import $ from 'jquery';


export const Home = () => {

    const onClick = () => {
        setTimeout(() => {window.scroll({
            bottom: document.body.scrollHeight, // or document.scrollingElement || document.body
            left: 0,
            behavior: 'smooth'
        });}, 1000)

    }

    const [active, setActive] = useState(false)

    useEffect(() => {    function addReview() {
        $.ajax({
            url: 'https://norm.in.ua/jsonReview',
            type: 'post',
            data: $('#form-review').serialize(),
            dataType: 'json',
            beforeSend: function () {
                $('#button-add').prop('disabled', true);
            },
            complete: function () {
                $('#button-add').prop('disabled', false);
            },
            success: function (json) {
                $('#form-review .form-control').removeClass('is-invalid');
                $('#form-review .text-danger').remove();

                if (json['error']) {
                    for (let i in json['error']) {
                        var element = $('#input-' + i.replace('_', '-'));

                        element.addClass('is-invalid');

                        if (element.parent().hasClass('input-group')) {
                            $(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
                        } else {
                            $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
                        }
                    }
                }

                if (json['redirect']) {
                    window.location.href = json['redirect'];
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }

        $('#button-add').on('click', function() {
            addReview();
        });

        $('#form-review .rating-radio .radio label').on('click', function() {
            $(this).parent('.radio').siblings('.radio').find('label').addClass('active');
        });

        $('#form-review .rating-radio input').on('click', function() {
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            if ($(this).val() === 1) {
                addReview();
            } else {


                $('.rating-fields').show('slow');
            }
        });}, [])

    return <div className={"back"}>
            <div id="content">
                <div className="container-fluid">
                    <div className="row review-header justify-content-between">
                        <div className="col-12 text-center">
                            <div className="prev-text pt-4 pt-md-5 pb-4">
                                <div className="title">Відгук про KILOGRAMM Херсон</div>
                                <div className="address">м. Херсон, вул. Унiверситетська, 3</div>
                            </div>
                            <div className="logo pt-4"><img src="https://norm.in.ua/image/company/1.svg"
                                                            className="img-fluid" alt="KILOGRAMM.Sushi Project"/>
                        </div>
                    </div>
                </div>
                </div>
                <div className="container pt-5 mt-md-5">
                    <form method="post" encType="multipart/form-data" id="form-review" className="form-horizontal">
                        <div className="row justify-content-center">
                            <div className="col-12 question-review text-center">Як вам?</div>
                            <div className="col-12">
                                <div className="rating-radio pt-4 pt-md-5">
                                    <div className="form-group d-flex justify-content-center align-items-center">
                                        <div className="radio pl-0 text-center form-check">
                                            <input type="radio" name="rating" value="1" id="input-rating2"
                                                   className="form-check-input"/>
                                                <label htmlFor="input-rating2" className="form-check-label text-center">
									<span className="d-block smile">
										<svg version="1.1" id="Capa_1"  fill="#fff" height="1em"
                                             width="1em" viewBox="0 0 512 512">
											<path d="M498.248,308.353c0-12.145-4.138-23.334-11.063-32.259c13.62-9.543,22.549-25.344,22.549-43.2
												  c0-29.075-23.654-52.73-52.729-52.73h-122.73l17.195-59.396V92.856C351.47,41.655,309.815,0,258.614,0
												  c-12.082,0-21.912,9.83-21.912,21.912v62.359c-9.83,15.973-76.114,89.369-138.594,155.531H2.266v229.39h95.942l75.127,28.173
												  C199.23,507.076,226.384,512,254.04,512h168.504c29.075,0,52.729-23.654,52.729-52.729c0-12.139-4.124-23.334-11.043-32.256
												  c13.613-9.544,22.53-25.352,22.53-43.203c0-12.145-4.138-23.334-11.063-32.258C489.318,342.009,498.248,326.209,498.248,308.353z
												  M89.57,439.193H32.266v-169.39H89.57V439.193z M457.006,255.623H443.55v30h1.969c12.533,0,22.729,10.196,22.729,22.73
												  s-10.196,22.729-22.729,22.729h-9.402v0.053c-0.693-0.027-1.386-0.053-2.085-0.053v30c12.533,0,22.729,10.196,22.729,22.729
												  c0,12.533-10.196,22.73-22.73,22.73h-11.487v30c12.533,0,22.729,10.196,22.729,22.73S435.077,482,422.544,482H254.04
												  c-24.047,0-47.656-4.281-70.173-12.725l-64.298-24.111v-184.4c10.637-11.288,40.3-42.872,69.654-75.094
												  c21.478-23.574,38.613-42.898,50.933-57.436c24.035-28.361,26.546-34.271,26.546-40.992V30.518
												  c30.854,3.98,54.768,30.419,54.768,62.339v23.655l-27.111,93.652h162.647c12.533,0,22.729,10.196,22.729,22.73
												  S469.539,255.623,457.006,255.623z"/>
										</svg>
									</span>
                                                    <span className="d-block text">Норм</span>
                                                </label>
                                        </div>
                                        <div className="radio pl-0 text-center form-check">
                                            <input type="radio" name="rating" value="2" id="input-rating1"
                                                   className="form-check-input"/>
                                                <label  onClick={onClick} htmlFor="input-rating1" className="form-check-label text-center">
									<span className="d-block smile">
										<svg version="1.1" id="Capa_1" fill="#000" height="1em"
                                             width="1em" viewBox="0 0 512 512">
											<path d="M498.248,308.353c0-12.145-4.138-23.334-11.063-32.259c13.62-9.543,22.549-25.344,22.549-43.2
												  c0-29.075-23.654-52.73-52.729-52.73h-122.73l17.195-59.396V92.856C351.47,41.655,309.815,0,258.614,0
												  c-12.082,0-21.912,9.83-21.912,21.912v62.359c-9.83,15.973-76.114,89.369-138.594,155.531H2.266v229.39h95.942l75.127,28.173
												  C199.23,507.076,226.384,512,254.04,512h168.504c29.075,0,52.729-23.654,52.729-52.729c0-12.139-4.124-23.334-11.043-32.256
												  c13.613-9.544,22.53-25.352,22.53-43.203c0-12.145-4.138-23.334-11.063-32.258C489.318,342.009,498.248,326.209,498.248,308.353z
												  M89.57,439.193H32.266v-169.39H89.57V439.193z M457.006,255.623H443.55v30h1.969c12.533,0,22.729,10.196,22.729,22.73
												  s-10.196,22.729-22.729,22.729h-9.402v0.053c-0.693-0.027-1.386-0.053-2.085-0.053v30c12.533,0,22.729,10.196,22.729,22.729
												  c0,12.533-10.196,22.73-22.73,22.73h-11.487v30c12.533,0,22.729,10.196,22.729,22.73S435.077,482,422.544,482H254.04
												  c-24.047,0-47.656-4.281-70.173-12.725l-64.298-24.111v-184.4c10.637-11.288,40.3-42.872,69.654-75.094
												  c21.478-23.574,38.613-42.898,50.933-57.436c24.035-28.361,26.546-34.271,26.546-40.992V30.518
												  c30.854,3.98,54.768,30.419,54.768,62.339v23.655l-27.111,93.652h162.647c12.533,0,22.729,10.196,22.729,22.73
												  S469.539,255.623,457.006,255.623z"/>
										</svg>
									</span>
                                                    <span  className="d-block text">Не норм</span>
                                                </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="here" className="col-12 pt-3 pb-5">
                            <div className={["rating-fields p-3 p-md-4 shadow rounded text-center", !active && 'invisible'].join(" ")}>
                                <div  className="question-form text-center">Що саме не так?</div>
                                <div className="form-group">
                                    <input type="text" name="name" placeholder="Ім'я" id="input-name"
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">+38</span>
                                        </div>
                                        <input type="text" name="phone" placeholder="Телефон" id="input-phone"
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea name="comment"
                                              placeholder="Залиште невеликий відгук. Чим саме були незадоволені?"
                                              rows="4" id="input-comment" className="form-control"/>
                                </div>
                                <button type="button" id="button-add" className="btn btn-primary">Відправити</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
    </div>}

