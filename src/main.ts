import './index.css';

// --- [Slider Interface & Interaction / 슬라이더 인터랙션 제어 영역] ---

/**
 * @class PortfolioSlider
 * @description 터치 드래그, 키보드 접근성(A11y), 반응형 스무스 스크롤을 제어하는 포트폴리오 작업물 슬라이더 제어 클래스입니다.
 */
class PortfolioSlider {
  /** @type {HTMLDivElement} 슬라이더 메인 뷰포트 컨테이너 */
  private slider: HTMLDivElement;
  /** @type {HTMLButtonElement} 이전 방향 스크롤 트리거 버튼 */
  private btnPrev: HTMLButtonElement;
  /** @type {HTMLButtonElement} 다음 방향 스크롤 트리거 버튼 */
  private btnNext: HTMLButtonElement;

  /** @type {boolean} 현재 마우스 드래그 동작이 활성화되어 있는지 여부 */
  private isDown = false;
  /** @type {number} 마우스 클릭 다운 시점의 수평 스크린 좌표 */
  private startX = 0;
  /** @type {number} 드래그 활성화 직전의 슬라이더 수평 스크롤 오프셋 */
  private scrollLeft = 0;

  /**
   * @constructor
   * @param {HTMLDivElement} slider 슬라이더 컨테이너 DOM
   * @param {HTMLButtonElement} btnPrev 이전 버튼 DOM
   * @param {HTMLButtonElement} btnNext 다음 버튼 DOM
   */
  constructor(slider: HTMLDivElement, btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement) {
    this.slider = slider;
    this.btnPrev = btnPrev;
    this.btnNext = btnNext;

    this.init();
  }

  // --- [Initialization / 초기화 설정] ---
  /**
   * @private
   * @method init
   * @description 슬라이더 자체에 키보드 탭 인덱스를 활성화하고 초기 제어 상태 동기화 및 이벤트를 바인딩합니다.
   */
  private init(): void {
    this.slider.tabIndex = 0; // 키보드 포커스(Focus, 초점) 탭 타겟 활성화
    this.updateButtonState();
    this.bindEvents();
  }

  // --- [Scroll Metric Calculation / 스크롤 수치 계산] ---
  /**
   * @private
   * @method getScrollAmount
   * @description 첫 번째 하위 요소의 너비와 슬라이더의 gap 스타일을 런타임에 동적으로 조회하여 스크롤 1회 이동 단위를 계산합니다.
   * @returns {number} 동적으로 연산된 스크롤 이동 픽셀값
   */
  private getScrollAmount(): number {
    const firstSlide = this.slider.firstElementChild as HTMLElement | null;
    if (firstSlide) {
      // 런타임(Runtime, 실행 시간)에 CSS Grid Gap 값을 정밀하게 추적
      const style = window.getComputedStyle(this.slider);
      const gapValue = parseFloat(style.gap) || 32;
      return firstSlide.clientWidth + gapValue;
    }
    return 300; // 슬라이드 정보 탐색 실패 시 기본 폴백(Fallback, 대체 작동)값
  }

  // --- [UI State Management / 버튼 활성 제어] ---
  /**
   * @private
   * @method updateButtonState
   * @description 슬라이더 스크롤 위치를 분석하여 이전/다음 탐색 버튼의 비활성화 상태 및 ARIA 접근성 속성을 갱신합니다.
   */
  private updateButtonState = (): void => {
    const tolerance = 5; // 브라우저 소수점 픽셀 렌더링 오차 상쇄를 위한 임계값
    const isAtStart = this.slider.scrollLeft <= tolerance;
    const isAtEnd = this.slider.scrollLeft + this.slider.clientWidth >= this.slider.scrollWidth - tolerance;

    this.btnPrev.disabled = isAtStart;
    this.btnNext.disabled = isAtEnd;

    // W3C WAI-ARIA 접근성 지침 준수를 위한 속성 상태 동기화
    this.btnPrev.setAttribute('aria-disabled', isAtStart.toString());
    this.btnNext.setAttribute('aria-disabled', isAtEnd.toString());
  };

  // --- [Scroll Actions / 스크롤 이동 명령 수행] ---
  /**
   * @private
   * @method scrollSlider
   * @description 이전 혹은 다음 방향으로 스크롤 액션을 스무스하게 실행합니다.
   * @param {'prev' | 'next'} direction 이동 명령 방향
   */
  private scrollSlider(direction: 'prev' | 'next'): void {
    const amount = this.getScrollAmount();
    const targetScrollLeft = direction === 'prev' 
      ? this.slider.scrollLeft - amount 
      : this.slider.scrollLeft + amount;

    this.slider.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth' // 브라우저 네이티브 스무스(Smooth, 부드러운) 스크롤 애니메이션 사용
    });
  }

  // --- [Mouse Event Handlers / 마우스 드래그 핸들러] ---
  /**
   * @private
   * @method handleMouseDown
   * @description 마우스 클릭 다운 시점에 드래그 조작을 활성화하고 커서를 변경합니다.
   * @param {MouseEvent} e 마우스 이벤트 객체
   */
  private handleMouseDown = (e: MouseEvent): void => {
    this.isDown = true;
    this.slider.classList.add('grabbing'); // 드래그 마우스 커서 UI 전환
    this.startX = e.pageX - this.slider.offsetLeft;
    this.scrollLeft = this.slider.scrollLeft;
  };

  /**
   * @private
   * @method handleMouseLeaveUp
   * @description 마우스가 영역을 벗어나거나 클릭을 뗄 때 드래그 조작을 안전하게 중단합니다.
   */
  private handleMouseLeaveUp = (): void => {
    this.isDown = false;
    this.slider.classList.remove('grabbing');
  };

  /**
   * @private
   * @method handleMouseMove
   * @description 드래그 도중 마우스 이동 거리에 감도를 적용하여 슬라이더 내부 스크롤을 갱신합니다.
   * @param {MouseEvent} e 마우스 이벤트 객체
   */
  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.isDown) return;
    e.preventDefault(); // 스크롤 동작 도중 텍스트 드래그 선택 기능 차단
    const x = e.pageX - this.slider.offsetLeft;
    const walk = (x - this.startX) * 1.5; // 드래그 스크롤 마우스 감도 감속 보정
    this.slider.scrollLeft = this.scrollLeft - walk;
  };

  // --- [Keyboard Event Handlers / 키보드 단축키 핸들러] ---
  /**
   * @private
   * @method handleKeyDown
   * @description 방향키 키 입력을 캡처하여 키보드 기반의 수평 스크롤 이동을 매핑합니다.
   * @param {KeyboardEvent} e 키보드 이벤트 객체
   */
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault(); // 화살표 키 조작 시 브라우저 스크롤 바디 스크롤 차단
      this.scrollSlider('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.scrollSlider('next');
    }
  };

  // --- [Event Binding / 이벤트 리스너 등록] ---
  /**
   * @private
   * @method bindEvents
   * @description 슬라이더 인터랙션에 필요한 드래그, 단축키, 창 크기 변경 등의 리스너를 등록합니다.
   */
  private bindEvents(): void {
    // 수평 터치 마우스 드래그 앤 드롭 바인딩
    this.slider.addEventListener('mousedown', this.handleMouseDown);
    this.slider.addEventListener('mouseleave', this.handleMouseLeaveUp);
    this.slider.addEventListener('mouseup', this.handleMouseLeaveUp);
    this.slider.addEventListener('mousemove', this.handleMouseMove);

    // W3C 표준 키보드 내비게이션 지원 바인딩
    this.slider.addEventListener('keydown', this.handleKeyDown);

    // 이전/다음 조작 네비게이션 버튼 클릭 바인딩
    this.btnPrev.addEventListener('click', () => this.scrollSlider('prev'));
    this.btnNext.addEventListener('click', () => this.scrollSlider('next'));

    // 스크롤 및 윈도우 창 크기 리사이즈(Resize) 시 상태 실시간 갱신 바인딩
    this.slider.addEventListener('scroll', this.updateButtonState);
    window.addEventListener('resize', this.updateButtonState);
  }
}

// --- [App Entry Point / 어플리케이션 진입점] ---
const sliderElement = document.getElementById('portfolio-slider') as HTMLDivElement | null;
const btnPrevElement = document.getElementById('btn-prev') as HTMLButtonElement | null;
const btnNextElement = document.getElementById('btn-next') as HTMLButtonElement | null;

if (sliderElement && btnPrevElement && btnNextElement) {
  // 슬라이더 컴포넌트 실체화 인스턴스 생성
  new PortfolioSlider(sliderElement, btnPrevElement, btnNextElement);
}
