// ===== قائمة التنقل المتجاوبة =====
let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    navbar.classList.remove('active');
};

// ===== مشغل الفيديو للطور الثانوي =====
let mainVid = document.querySelector('.main-video');

if (mainVid) {
    document.querySelectorAll('.course-3 .box .video video').forEach(vid => {
        vid.onclick = () => {
            let src = vid.getAttribute('src');
            mainVid.classList.add('active');
            mainVid.querySelector('video').src = src;
        };
    });

    let closeVid = document.querySelector('#close-vid');
    if (closeVid) {
        closeVid.onclick = () => {
            mainVid.classList.remove('active');
        };
    }
}

// ===== نظام تنقل الدروس (اختيار الطور والمادة) =====
document.addEventListener('DOMContentLoaded', function () {

    // بيانات المواد لكل طور
    const stagesData = {
        'ابتدائي': {
            label: 'الطور الابتدائي',
            icon: 'fa-child',
            link: 'course-1.html',
            subjects: [
                { name: 'الرياضيات', icon: 'fa-calculator' },
                { name: 'اللغة العربية', icon: 'fa-book-open' },
                { name: 'التربية الإسلامية', icon: 'fa-star-and-crescent' },
                { name: 'اللغة الفرنسية', icon: 'fa-language' },
                { name: 'التربية العلمية', icon: 'fa-flask' },
                { name: 'التربية المدنية', icon: 'fa-flag' },
                { name: 'التاريخ والجغرافيا', icon: 'fa-globe-africa' },
            ]
        },
        'متوسط': {
            label: 'الطور المتوسط',
            icon: 'fa-user-graduate',
            link: 'course-2.html',
            subjects: [
                { name: 'الرياضيات', icon: 'fa-calculator' },
                { name: 'العلوم الطبيعية', icon: 'fa-leaf' },
                { name: 'اللغة العربية', icon: 'fa-book-open' },
                { name: 'اللغة الفرنسية', icon: 'fa-language' },
                { name: 'اللغة الإنجليزية', icon: 'fa-globe' },
                { name: 'التاريخ والجغرافيا', icon: 'fa-globe-africa' },
                { name: 'التربية الإسلامية', icon: 'fa-star-and-crescent' },
                { name: 'الفيزياء والتكنولوجيا', icon: 'fa-atom' },
            ]
        },
        'ثانوي': {
            label: 'الطور الثانوي',
            icon: 'fa-graduation-cap',
            link: 'course-3.html',
            subjects: [
                { name: 'الرياضيات', icon: 'fa-calculator' },
                { name: 'الفيزياء والكيمياء', icon: 'fa-atom' },
                { name: 'العلوم الطبيعية والحياة', icon: 'fa-dna' },
                { name: 'اللغة العربية', icon: 'fa-book-open' },
                { name: 'اللغة الإنجليزية', icon: 'fa-globe' },
                { name: 'التاريخ والجغرافيا', icon: 'fa-globe-africa' },
                { name: 'اللغة الفرنسية', icon: 'fa-language' },
                { name: 'الفلسفة', icon: 'fa-brain' },
            ]
        },
        'جامعي': {
            label: 'الطور الجامعي',
            icon: 'fa-university',
            link: 'course-4.html',
            subjects: [
                { name: 'الرياضيات الجامعية', icon: 'fa-calculator' },
                { name: 'الفيزياء الجامعية', icon: 'fa-atom' },
                { name: 'الكيمياء العامة', icon: 'fa-flask' },
                { name: 'علوم الحاسوب', icon: 'fa-laptop-code' },
                { name: 'الاقتصاد والتسيير', icon: 'fa-chart-line' },
                { name: 'القانون العام', icon: 'fa-balance-scale' },
                { name: 'الطب والصيدلة', icon: 'fa-heartbeat' },
                { name: 'الهندسة المدنية', icon: 'fa-hard-hat' },
                { name: 'الأدب العربي', icon: 'fa-book-open' },
            ]
        }
    };

    // ===== بناء واجهة اختيار الطور إذا وُجد حاوي الأزرار =====
    const lessonsNavContainer = document.getElementById('lessons-navigator');
    if (lessonsNavContainer) {
        buildLessonsNavigator(lessonsNavContainer, stagesData);
    }

    // ===== تفعيل الأزرار الموجودة بالصفحة (stage-btn) =====
    document.querySelectorAll('.stage-btn[data-stage]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const stage = this.dataset.stage;
            showSubjectsPanel(stage, stagesData);

            document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

function buildLessonsNavigator(container, stagesData) {
    // إنشاء أزرار الأطوار
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'lessons-nav';
    btnWrapper.innerHTML = '<h2 style="width:100%;text-align:center;font-size:2.5rem;color:#302851;margin-bottom:1rem;">اختر طورك الدراسي</h2>';

    Object.keys(stagesData).forEach(key => {
        const stage = stagesData[key];
        const btn = document.createElement('a');
        btn.href = stage.link;
        btn.className = 'stage-btn';
        btn.dataset.stage = key;
        btn.innerHTML = `<i class="fas ${stage.icon}" style="margin-left:0.5rem"></i> ${stage.label}`;
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showSubjectsPanel(key, stagesData);
        });
        btnWrapper.appendChild(btn);
    });

    container.appendChild(btnWrapper);

    // حاوي المواد
    const panel = document.createElement('div');
    panel.id = 'subjects-panel';
    panel.className = 'subjects-panel';
    container.appendChild(panel);
}

function showSubjectsPanel(stageKey, stagesData) {
    const panel = document.getElementById('subjects-panel');
    if (!panel) return;

    const stage = stagesData[stageKey];
    if (!stage) return;

    panel.innerHTML = '';

    // عنوان القسم
    const title = document.createElement('p');
    title.style.cssText = 'width:100%;text-align:center;font-size:2rem;color:#224bcf;font-weight:bold;margin-bottom:1.5rem;';
    title.innerHTML = `<i class="fas fa-book" style="color:#fa1d86;margin-left:0.5rem"></i> مواد ${stage.label}`;
    panel.appendChild(title);

    // بطاقات المواد
    stage.subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `<i class="fas ${subject.icon}"></i> ${subject.name}`;
        card.onclick = () => {
            window.location.href = stage.link;
        };
        panel.appendChild(card);
    });

    // زر الانتقال للصفحة
    const goBtn = document.createElement('a');
    goBtn.href = stage.link;
    goBtn.style.cssText = 'width:100%;text-align:center;margin-top:1.5rem;display:block;';
    goBtn.className = 'btn';
    goBtn.innerHTML = `<i class="fas fa-arrow-left" style="margin-right:0.5rem"></i> انتقل إلى ${stage.label}`;
    panel.appendChild(goBtn);

    panel.classList.add('active');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== تبديل عرض لوحات السنوات الدراسية =====
function toggleYears(event, panelId) {
    event.preventDefault();
    
    const allPanels = document.querySelectorAll('.years-panel');
    const allBtns = document.querySelectorAll('.stage-btn');
    const targetPanel = document.getElementById(panelId);
    const clickedBtn = event.currentTarget;
    
    const isAlreadyOpen = targetPanel && targetPanel.classList.contains('active');
    
    // إغلاق جميع اللوحات
    allPanels.forEach(p => p.classList.remove('active'));
    allBtns.forEach(b => b.classList.remove('active'));
    
    // إذا لم يكن مفتوحاً، افتحه
    if (!isAlreadyOpen && targetPanel) {
        targetPanel.classList.add('active');
        clickedBtn.classList.add('active');
        // التمرير السلس إلى اللوحة
        setTimeout(() => {
            targetPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}
