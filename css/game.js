// a játék terület
let game_area;
let game_area_w; // játék tér szélesége
let src_w =100; // induló terület szélesége
let src_h = 100; // induló terület magassága
let dsc_w =100; // induló terület szélesége
let dsc_h = 100; // induló terület magassága
let game_area_h;// játék tér magassága
let src_area; // induló terület
let dsc_area;

//1 pálya kincsei
let kincs;
let kincs_space = 100;
let kincs_x = 80;
let kincs_y = 200;
let kincs_b_x = 80;
let kincs_b_y = 100;
let kincs_tw_x = 180;
let kincs_tw_y = 260;

let kincs_tw_num =6;
let kincs_tw_array = [];
let kincs_space_tw= 100;
let game_over_jelzo = 0;
let kincs_num = 6;
let kincs_array = [];
// negyzet amivel megyünk
let negyzet;
let negyzet_w = 20;
let negyzet_h = 20;
let move_step = 20;
// ellenséges objektumok
let enemy_balls_tw_num = 5;
let enemy_balls_tw_array=[];
let enemy_balls_x_tw = 680;
let enemy_balls_y_tw = 20;
let enemy_balls_space_tw = 80;
let move_interval_balls;
let enemy_balls_top_num = 3;
let enemy_balls_down_num = 3;
let enemy_balls;
let enemy_balls_x = 160;
let enemy_balls_y = 0;
let enemy_balls_dx = 260;
let enemy_balls_dy =  380;
let enemy_balls_space = 200;
let enemy_balls_down_array = [];
let enemy_balls_top_array = [];

let moveu;
let moved;
// lista
let list_area;
let list_w;
let list_h;
//setinterval
let check_col;
let check_col_balls;
//Pont számok
let elet = 3;
let score = 0 ;
let volt_kincs = 0; //ha már az első pályán felvettél egy kincset akkor nem tudsz a másik pályára ugrani mivel elkezted azt

$(document).ready(function () {

    game_area = $('#game_area');
    list_area = $('#top_list ');

    src_area = $('<img src="image/4.jpg" id="src_area">');
    dsc_area = $('<img src="image/4.jpg" id="desc_area">');
    negyzet = $('<img src = "image/interface.png" id = "negyzet">');
    enemy_balls = $('<img src = "image/icon.png" id = "enemy">');
    kincs = $('<img src = "image/yellow.png" id = "kincs">');

    game_area.append(src_area);
    game_area.append(dsc_area);
    game_area.append(negyzet);
    // a jatekter szelessegenek lekerdezese
    game_area_w = parseInt(game_area.css('width'));
    // a jatekter magassaganak lekerdezese
    game_area_h = parseInt(game_area.css('height'));

    list_w = parseInt(list_area.css('width'));
    list_h = parseInt(list_area.css('height'));
    kincs.on('load', function () {
        init_kincs();
    });
    kincs.on('load', function () {
        init_kincs_bonus();
    });
    src_area.on('load', function () {
        init_src_area();
    });
    dsc_area.on('load', function () {
        init_dsc_area();
    });
    negyzet.on('load', function () {
        init_negyzet();
    });

    enemy_balls.on('load', function () {
        init_enemy_balls_top();
    });
    enemy_balls.on('load', function () {
        init_enemy_balls_down();
    });

    // kincs számláló div
    let score_div = '<div id="score_div">Kincs:<span id="score"></span></div>';
    game_area.append(score_div);
    $('#score').append(score);
    // élet számláló div
    let elet_div = '<div id="elet_div">Élet:<span id="elet"></span></div>';
    game_area.append(elet_div);
    $('#elet').append(elet);

   moveu = setInterval(enemmy_balls_top_move,35);
   moved = setInterval(enemmy_balls_down_move,35);
   move_interval_balls= setInterval(enemmy_balls_tw_move,55);
   check_col = setInterval(check_collision, 1);
   check_col_balls = setInterval(check_collision_balls, 1);

    $(window).on('keydown', move_negyzet);
});
    function game_music_basic() {
           setTimeout(function () {
            document.getElementById("audio-basic").play();
       });
    }
    function game_music_pause() {
        setTimeout(function () {
            document.getElementById("audio-basic").pause();
        });
    }
    function game_music_kincs() {
        setTimeout(function () {
            document.getElementById("audio-game_kincs").play();
        });
    }
    function game_over_music() {
        setTimeout(function () {
            document.getElementById("audio-game_over").play();
        });
    }
    function game_punch_balls_music() {
        setTimeout(function () {
            document.getElementById("audio-game_punch").play();
        });
    }
    function init_src_area() {
       src_area.css({
           width:src_w,
           height:src_h
       });
        src_area.css({
           top:game_area_h-src_h
        });
    }
    function init_dsc_area() {
        dsc_area.css({
            width:dsc_w,
            height:dsc_h
        });
        dsc_area.css({
            left:game_area_w-dsc_w
        });
    }
    function init_negyzet() {
            negyzet.css({
            top:game_area_h-negyzet_h,
            left:0
        });
        negyzet.addClass("negyzet");

    }
    function init_kincs() {
        for(let i = 0; i <kincs_num;i++ ){
            kincs_array.push({
                x_pos:kincs_x + i * kincs_space,
                y_pos:kincs_y,
                imgObj: kincs.clone()
            });
        }

        draw_kincs();
    }
    function init_kincs_bonus() {
        for(let i = 0; i <kincs_num;i++ ){
            kincs_array.push({
                x_pos:kincs_b_x + i * kincs_space,
                y_pos:kincs_b_y,
                imgObj: kincs.clone()
            });
        }

        draw_kincs_bonus();
    }

    function init_kincs_tw() {
        for(let i = 0; i <kincs_tw_num;i++ ){
            kincs_tw_array.push({
                x_pos:kincs_tw_x + i * kincs_space_tw,
                y_pos:kincs_tw_y,
                imgObj: kincs.clone()
            });
        }
        draw_kincs_tw();
    }
    function draw_kincs_tw() {
        for(let e in kincs_tw_array ){
            let act_kincs_tw =kincs_tw_array[e];
            let act_img_tw =  act_kincs_tw.imgObj
            game_area.append(act_img_tw)
            act_img_tw.css({
                left: act_kincs_tw.x_pos,
                top:act_kincs_tw.y_pos,
            });
            act_img_tw.addClass("kincs")
        }
    }
    function draw_kincs_bonus() {
        for(let e in kincs_array ){
            let act_kincs_d =kincs_array[e];
            let act_img_k =  act_kincs_d.imgObj
            game_area.append(act_img_k)
            act_img_k.css({
                left: act_kincs_d.x_pos,
                top:act_kincs_d.y_pos,
            });
            act_img_k.addClass("kincs");

        }
    }
    function draw_kincs() {
        for(let e in kincs_array ){
            let act_kincs_d =kincs_array[e];
            let act_img_k =  act_kincs_d.imgObj
            game_area.append(act_img_k)
            act_img_k.css({
                left: act_kincs_d.x_pos,
                top:act_kincs_d.y_pos,
            });
            act_img_k.addClass("kincs")
        }
    }
    function  init_enemy_balls_top() {
        for(let i = 0; i <enemy_balls_top_num;i++ ){
            enemy_balls_top_array.push({
                x_pos:enemy_balls_x + i * enemy_balls_space,
                y_pos:enemy_balls_y,
                imgObj: enemy_balls.clone()
            });
        }
        draw_enemy_balls_top();
    }
    function  init_enemy_balls_down() {
        for(let i = 0; i <enemy_balls_down_num;i++ ){
            enemy_balls_down_array.push({
                x_pos:enemy_balls_dx + i * enemy_balls_space,
                y_pos:enemy_balls_dy,
                imgObj: enemy_balls.clone()
            });
        }
        draw_enemy_balls_down();
    }
    function draw_enemy_balls_down() {
        for(let e in enemy_balls_down_array ){
            let act_enemy_d = enemy_balls_down_array[e];
            let act_img_d =  act_enemy_d.imgObj
            game_area.append(act_img_d)
            act_img_d.css({
                left: act_enemy_d.x_pos,
                top:act_enemy_d.y_pos,
            });
            act_img_d.addClass("enemy_d")
        }
    }
    function draw_enemy_balls_top() {
        for(let e in enemy_balls_top_array ){
            let act_enemy = enemy_balls_top_array[e];
            let act_img =  act_enemy.imgObj
            game_area.append(act_img)
            act_img.css({
                left: act_enemy.x_pos,
                top:act_enemy.y_pos,
            });
            act_img.addClass("enemy")
        }
    }
    function  init_enemy_balls_tw() {
        if(volt_kincs === 0) {
            for(let i = 0; i <enemy_balls_tw_num;i++ ){
                enemy_balls_tw_array.push({
                    x_pos:enemy_balls_x_tw,
                    y_pos:enemy_balls_y_tw + i* enemy_balls_space_tw,
                    imgObj: enemy_balls.clone()
                });
            }

            init_negyzet();
            init_kincs_tw();

            draw_enemy_balls_tw();

            elet = 3;
            score = 0;
            $('#score').text(score);
            $('#elet').text(elet);
        }

    }

    function draw_enemy_balls_tw() {
        for(let e in enemy_balls_tw_array ){
            let act_enemy_tw = enemy_balls_tw_array[e];
            let act_img_tw =  act_enemy_tw.imgObj
            game_area.append(act_img_tw)
            act_img_tw.css({
                left: act_enemy_tw.x_pos,
                top:act_enemy_tw.y_pos,
            });
            act_img_tw.addClass("enemy_tw")
        }
    }

    function  enemmy_balls_top_move() {
        $('.enemy').each(function () {
            if ($(this).position().top +20  < game_area_h) {
                $(this).css({
                    top: '+=20'
                })
            } else {
                $(this).css({
                    top:0
                });
            }
        });
    }
    function  enemmy_balls_tw_move() {
        $('.enemy_tw').each(function () {
            if ($(this).position().left -20 > 100 ) {
                $(this).css({
                    left: '-=20'
                })
            } else {
                $(this).css({
                    left:680
                });
            }
        });
    }
    function  enemmy_balls_down_move() {
        $('.enemy_d').each(function () {
            if ($(this).position().top -20 >  0) {
                $(this).css({
                    top: '-=20'
                })
            } else {
                $(this).css({
                    top: 380,
                });
            }
        });
    }
    function move_negyzet(ev) {
        // lenyomott billentyu
        let pressed_key = ev.key;
        // ha a lenyomott billentyu a jobbra nyil
        if (pressed_key === 'ArrowRight' && game_over_jelzo === 0) {
            game_music_basic();
            // annak vizsgalata, hogy a jatekteren belul vagyunk-e meg
            if (parseInt(negyzet.css('left')) + negyzet_w < game_area_w) {
                negyzet.animate({
                    left: '+=' + move_step
                }, 1)
            } else {
                negyzet.animate({
                    left: game_area_w - negyzet_w
                }, 1)
            }
            // ha a lenyomott billentyu a balra nyil
        } else if (pressed_key === 'ArrowLeft' && game_over_jelzo ===0) {
            game_music_basic();
            // annak vizsgalata, hogy a jatekteren belul vagyunk-e meg
            if (parseInt(negyzet.css('left')) - move_step > 0) {
                negyzet.animate({
                    left: '-=' + move_step
                }, 1)
            } else {
                negyzet.animate({
                    left: 0
                }, 1)
            }
        } else if (pressed_key === 'ArrowDown' && game_over_jelzo === 0) {
           game_music_basic();
            // annak vizsgalata, hogy a jatekteren belul vagyunk-e meg
            if (parseInt(negyzet.css('top')) + move_step < game_area_h) {
                negyzet.animate({
                    top: '+=' + move_step
                }, 1)
            } else {
                negyzet.animate({
                    top: game_area_h-negyzet_h
                }, 1)
            }
        }
        else if (pressed_key === 'ArrowUp' && game_over_jelzo === 0) {
           game_music_basic();
            // annak vizsgalata, hogy a jatekteren belul vagyunk-e meg
            if (parseInt(negyzet.css('top')) - move_step >= 0) {
                negyzet.animate({
                    top: '-=' + move_step
                }, 1)
            } else {
                negyzet.animate({
                    top: 0
                }, 1)
            }
        }
    }
    function check_collision() {
        $('.kincs').each(function () {
            if ($(this).position().top === negyzet.position().top && $(this).position().left === negyzet.position().left) {
                game_music_kincs();
                $(this).remove();
                score++;
                volt_kincs++;
                $('#score').text(score);
            }
        });
      win();
    }
    function check_collision_balls() {
        if( elet === 0) {
            setTimeout(game_over,100);
        }
        $('.enemy').each(function () {
            if ($(this).position().top === negyzet.position().top && $(this).position().left === negyzet.position().left) {
                setTimeout(game_punch_balls_music,1);
                elet --;
                $('#elet').text(elet);
                init_negyzet();
            }
        });
        $('.enemy_d').each(function () {
            if ($(this).position().top === negyzet.position().top && $(this).position().left === negyzet.position().left) {
                game_punch_balls_music();
                elet --;
                $('#elet').text(elet);
                init_negyzet();
            }


        });
       $('.enemy_tw').each(function () {
            if ($(this).position().top === negyzet.position().top && $(this).position().left === negyzet.position().left) {
                game_punch_balls_music();
                elet --;
                $('#elet').text(elet);
                init_negyzet();
            }


        });
    }
    function win() {
        if(negyzet.position().left >= 700 && negyzet.position().top < 100 ){
            clearInterval( moveu);
            clearInterval( moved);
            clearInterval( check_col);
            clearInterval(move_interval_balls);
            setTimeout(lista,200);

        }
    }
    function  game_over() {
        game_over_jelzo++;
        game_music_pause();
        game_over_music();
        clearInterval( moveu);
        clearInterval( moved);
        clearInterval( check_col);
        clearInterval( check_col_balls);
       clearInterval(move_interval_balls);
        $('.game_area_two').remove();
        $('.game_area_one').remove();
        $('.irany').remove();
        $('.link').remove();
        game_area.empty();
        list_area.remove();

        game_area.append('<div class="game_over">GAME OVER:)</div>');
    }
    function lista () {
        $('.game_area_two').remove();
        $('.game_area_one').remove();

        let person = prompt("Adja meg a nevét:", "anonymus");
        localStorage.setItem(person, Number(score));
        game_over_jelzo++;
        fill_toplist()
    }
    function fill_toplist() {
        game_music_pause();
        // vegigmegyunk a localStorage mentett elemein es egy uj tombbe pakoljuk. asszociativ tomb
        let data = [];
        for (let i = 0; i < localStorage.length; i++) {
            data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
        }
        if(localStorage.length === 10){
            localStorage.clear();
        }
        // csokkeno sorrendbe rendezzuk az elemeket az elert pontszam alapjan
        data.sort(function (a, b) {
            return b[1] - a[1];
        });

        // a 10 legtobb pontot elert jatekost jelezzuk ki a listan
        for (let act_data of data.keys()) {
            if (act_data < 10) {
                $('#list').append(data[act_data][0] + ' - ' + data[act_data][1] + '<br><hr>');
            }
        }

    }

