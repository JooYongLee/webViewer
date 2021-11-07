import "./FlexExample.css"
const example1 = {
    main: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        // flexDirection: "row-reverse"
        // flexDirection: "column"
        // flexDirection: "column-reverse"
    },
    box1: {
        width: "30vw",
        height: "10vh",
        border: "1px solid red",
        display: "flex",
        backgroundColor: "tomato",
        margin: "5px",
        alignItems: "center",

    }
}

function FlexGrowShirink() {
    return (
        <>
            <div className="main">
                <div className="box1">1</div>
                <div className="box1">2</div>
                <div className="box1">3</div>
                <div className="box1">4</div>
                <div className="box1">5</div>

            </div>
        </>
    )
}



function HolyGrailLayout(){
    return (<>
        <div className="holyGraiy">
            <header>
                <h1>MyViewer</h1>
            </header>
            <section className="content">
                <nav>
                    <ul>
                        <li>Html</li>
                        <li>Css</li>
                        <li>Javascript</li>
                    </ul>
                </nav>
                <main>
                    생활코딩은 일반인을 위한 코딩 수업입니다.
                    "신이 내린 재능이다. 이런 재능은 천 년에 한 번 나올까 말까 한 것이다. 김연아가 연기한 걸 보고 나면 난 그냥 코치하는 걸 집어치우고 싶다. 그녀가 등장해서 한 동작만 하면 그걸로 충분하다. 난 일어나서 경기장을 나가고 싶어진다."
- 알렉산더 줄린(러시아 피겨 스케이팅 코치이자 1994 릴레함메르 동계올림픽 아이스 댄스 은메달리스트), 2007 컵 오브 러시아 당시
"기술적으로[10], 그녀는 역사상 가장 위대하다 "[11]
- 테드 바튼(Ted Barton, 신채점제를 창시하는데 참여한 인물)
"김연아의 연기는 여자 피겨 스케이팅을 한 차원 높게 끌어올렸다. 기술적으로 모든 걸(The Whole Package) 갖췄다."
- 크리스티 야마구치(1992 알베르빌 동계올림픽 금메달리스트)
"김연아는 토탈 패키지다. 내가 그녀의 연기를 볼 때 뭔가 부족하다고 느끼는 점은 없다."
- 도로시 해밀(1976 인스브루크 동계올림픽 금메달리스트)
"김연아는 아무 약점이 없다. 그 누구하고도 김연아를 비교해보라. 김연아는 모든 것을 가졌다. 그 어떤 제도에서든, 장소에서든, 시간에서든, 승리는 그녀의 차지다."
- 스캇 해밀턴(1984 사라예보 동계올림픽 금메달리스트)
"Long live the queen!"[12]
- 미국의 유니버설 스포츠 메인페이지
- 톰 해먼드(2010 밴쿠버 동계올림픽 미국 NBC 방송의 해설진)

                </main>
                <aside>AD</aside>
            </section>
            <footer>
                <a href="https://naver.com">네이버</a>
            </footer>

        </div>
    
    </>)
}


export default function FlexExample() {
    return (
        <>
            {/* <FlexGrowShirink /> */}
            <HolyGrailLayout/>
        </>
    )
}