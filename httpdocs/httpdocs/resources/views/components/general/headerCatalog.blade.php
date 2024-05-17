<div class="header-catalog">
    <div class="header-catalog-links">
        <nav class="container d-flex align-items-center">
            <div class="header-catalog-btn header-catalog-hov d-flex" id="header-catalog-open" onclick="setActive()">
                <div class="header-catalog-btn-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p>Каталог</p>
            </div>
            <a href="/promotions">Акции</a>
            <a href="/services/dostavka">Доставка</a>
            <a href="/services/montaznye-raboty">Монтаж</a>
            <a href="/contacts">Контакты</a>
        </nav>
    </div>

    <div class="header-catalog-categories header-catalog-hov" id="header-catalog">
        <div class="header-catalog-close"id="header-catalog-close" onclick="setNonActive()">
        </div>
        <div class="container header-catalog-categories-content">
            @foreach($categories as $category)
                <a class="header-catalog-categories-content-el d-flex" href='/catalog/{{$category->alias}}'>
                    <img src='/storage/{{$category->image}}'>
                    <div class="d-flex flex-column">
                        <h2>{{$category->name}}</h2>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</div>

<script defer>
// оторабжение сайдабара/каталога в шапке
        const catalogBtnOpen = document.getElementById("header-catalog-open");
        const catalogBtnClose = document.getElementById("header-catalog-close");
        const catalogCategories = document.getElementById("header-catalog");

        function setActive(){
            catalogCategories.classList.toggle('active')
            catalogBtnOpen.classList.toggle('active')
        }
        function setNonActive(){
            catalogCategories.classList.remove('active')
            catalogBtnOpen.classList.remove('active')
        }


</script>
