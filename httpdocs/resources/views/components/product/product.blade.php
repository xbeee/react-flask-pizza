<div class="productPage-main d-flex" data-product_page="" data-product_container="" data-product_price="7 499" data-product_id="1">
    <div class="productPage-ph">
        <img class="productPage-photo centered" src="/storage/{{$product->image}}">
    </div>
    <div class="productPage-info">
        <h1>{{$product->name}}</h1>
        <p>Материал</p>
        <div class="d-flex material">
            @foreach($materials as $material)
                <div class="d-flex flex-column align-items-center">
                    <img src="/storage/{{$material->image}}">
                    <p>{{$material->name}}</p>
                </div>
            @endforeach
        </div>
        <div class="check">
            <div class="checkbox">
                <label class="checkbox-button d-flex align-items-center">
                    <input type="checkbox" class="checkbox-button__input" id="choice1" name="choice1">
                    <span class="checkbox-button__control"></span>
                    <span class="checkbox-button__label">Стандартное окрашивание защитной пропиткой (8 цветов)</span>
                </label>
            </div>
            <div class="checkbox">
                <label class="checkbox-button d-flex align-items-center">
                    <input type="checkbox" class="checkbox-button__input" id="choice2" name="choice2">
                    <span class="checkbox-button__control"></span>
                    <span class="checkbox-button__label">Окрашивание (палитра RAL)</span>
                </label>
            </div>
        </div>
        <div class="d-flex price_info ">
            <div class="d-flex flex-column">
                <span class="productPage-oldPrice">{{$product->oldPrice}} ₽</span>
                <span class="productPage-price">{{$product->price}} ₽</span>
            </div>
            <div class="d-flex flex-column">
                <p>Гарантия лучше цены</p>
                <span>Нашли дешевле? Снизим цену! </span>
                <a class="btn-tr">Нашел дешевле</a>
            </div>
        </div>
        <p></p>
        <div class="order_service d-flex flex-column">
            <p>Закажите услуги</p>
            <div class="order_service-check d-flex flex-column">
                <div class="d-flex align-items-center">
                    <label class="d-flex align-items-center">
                        <div class="checkbox">
                            <div class="checkbox-button">
                                <input type="checkbox" class="checkbox-button__input" id="choice1" name="choice1">
                                <span class="checkbox-button__control"></span>
                            </div>
                        </div>
                        <img src="/public/images/mechanic.svg">
                        <p>Монтаж</p>
                    </label>
                    <img class="order_service-check-q" src="/public/images/question.svg">
                </div>
                <div class="d-flex align-items-center">
                    <label class="d-flex align-items-center">
                        <div class="checkbox">
                            <div class="checkbox-button">
                                <input type="checkbox" class="checkbox-button__input" id="choice1" name="choice1">
                                <span class="checkbox-button__control"></span>
                            </div>
                        </div>
                        <img src="/public/images/delivery.svg">
                        <p>Доставка</p>
                    </label>
                    <img class="order_service-check-q" src="/public/images/question.svg">
                </div>
                <div class="d-flex align-items-center">
                    <label class="d-flex align-items-center">
                        <div class="checkbox">
                            <div class="checkbox-button">
                                <input type="checkbox" class="checkbox-button__input" id="choice1" name="choice1">
                                <span class="checkbox-button__control"></span>
                            </div>
                        </div>
                        <img src="/public/images/size.svg">
                        <p>По вашим размерам</p>
                    </label>
                    <img class="order_service-check-q" src="/public/images/question.svg">
                </div>
                <div class="d-flex align-items-center">
                    <label class="d-flex align-items-center">
                        <div class="checkbox">
                            <div class="checkbox-button">
                                <input type="checkbox" class="checkbox-button__input" id="choice1" name="choice1">
                                <span class="checkbox-button__control"></span>
                            </div>
                        </div>
                        <img src="/public/images/svarka.svg">
                        <p>Сварочные работы</p>
                    </label>
                    <img class="order_service-check-q" src="/public/images/question.svg">
                </div>
            </div>
            <div class="d-flex btns">
                <a class="btn btn-order">Заказать</a>
                <a class="btn-tr btn-order">Купить в 1 клик</a>
            </div>
            <a class="btn-tr d-flex align-items-center justify-content-center"> <img src="/public/images/mechanic.svg"> Узнать стоимость монтажа</a>
            <a class="btn-tr d-flex align-items-center justify-content-center">  <img src="/public/images/delivery.svg"> Узнать стоимость доставки</a>
        </div>
    </div>
</div>
