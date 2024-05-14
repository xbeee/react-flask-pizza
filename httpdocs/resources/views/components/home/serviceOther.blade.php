<section class="service-other">
    <div class="container">
        <h3>Услуги</h3>
        <div class="service-other-blocks service-other-main">

            @foreach($services as $service)
                <a class="d-flex align-items-end" href="/services/{{$service->alias}}" style="background-image: url(/storage/{{$service->image_background}});">
                    <p>{{$service->name}}</p>
                </a>

            @endforeach
{{--            <a class="d-flex align-items-end" href="/montag" style="background-image: url(/assets/img/montag.jpg);">--}}
{{--                <p>Монтажные<br>работы</p>--}}
{{--            </a>--}}
{{--            <a class="d-flex align-items-end" href="/dostavka" style="background-image: url(/assets/img/dostavka.jpg);">--}}
{{--                <p>Доставка</p>--}}
{{--            </a>--}}
{{--            <a class="d-flex align-items-end" href="/svarka" style="background-image: url(/assets/img/svarka.jpg);">--}}
{{--                <p>Сварочные работы</p>--}}
{{--            </a>--}}
{{--            <a class="d-flex align-items-end" href="/izdelie" style="background-image: url(/assets/img/izdelie.jpg);">--}}
{{--                <p>Изделие<br>по вашим размерам</p>--}}
{{--            </a>--}}
        </div>
    </div>
</section>
