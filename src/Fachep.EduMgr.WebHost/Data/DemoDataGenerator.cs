using System.Collections.Concurrent;
using Bogus;
using Fachep.EduMgr.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NpgsqlTypes;

namespace Fachep.EduMgr.WebHost.Data;

public class DemoDataGenerator(DbContext context, IPasswordHasher<User> passwordHasher)
{
    private static readonly Dictionary<string, (string[], string[])> SampleDepartments = new()
    {
        {
            "数学学院", (["数学与应用数学", "信息与计算科学", "统计学"], ["数学分析", "高等代数", "数值分析", "常微分方程", "概率论与数理统计"])
        },
        { "物理学院", (["物理学", "应用物理学"], ["理论力学", "电动力学", "量子力学", "热学", "光学", "固体物理"]) },
        { "化学学院", (["化学", "应用化学"], ["无机化学", "有机化学", "分析化学", "物理化学", "结构化学"]) },
        { "生命科学学院", (["生物科学", "生物技术"], ["细胞生物学", "遗传学", "生物化学", "分子生物学", "微生物学", "植物学", "动物学"]) },
        {
            "地理与环境学院",
            (["地理科学", "人文地理与城乡规划", "环境科学"], ["自然地理学", "人文地理学", "地理信息系统", "遥感原理", "环境监测", "生态学"])
        },
        {
            "计算机学院",
            (["计算机科学与技术", "软件工程"], ["程序设计", "数据结构", "操作系统", "计算机网络", "数据库系统", "人工智能", "编译原理"])
        },
        {
            "电子信息学院",
            (["电子信息工程", "通信工程", "自动化"],
                ["电路原理", "信号与系统", "数字电子技术", "模拟电子技术", "控制理论", "通信原理", "嵌入式系统"])
        },
        {
            "机械工程学院",
            (["机械设计制造及其自动化", "工业设计"], ["工程制图", "机械原理", "机械设计", "材料力学", "制造工艺学", "CAD/CAM"])
        },
        { "土木工程学院", (["土木工程", "建筑学"], ["结构力学", "土力学", "混凝土结构设计", "建筑设计原理", "工程测量"]) },
        { "材料科学与工程学院", (["材料科学与工程"], ["材料物理与化学", "金属学原理", "材料加工", "材料检测技术"]) },
        {
            "经济学院",
            (["经济学", "国际经济与贸易", "金融学"], ["微观经济学", "宏观经济学", "国际贸易", "货币银行学", "计量经济学", "金融市场学"])
        },
        { "管理学院", (["工商管理", "会计学", "市场营销"], ["管理学原理", "财务管理", "会计学原理", "市场营销学", "组织行为学", "战略管理"]) },
        { "法学院", (["法学"], ["法理学", "宪法学", "民法学", "刑法学", "行政法学", "国际法", "诉讼法"]) },
        { "教育学院", (["教育学", "心理学"], ["教育学原理", "教育心理学", "发展心理学", "教育统计与测量", "课程与教学论"]) },
        {
            "文学与新闻传播学院",
            (["汉语言文学", "新闻学", "传播学"], ["文学概论", "现代汉语", "中国文学史", "新闻写作", "传播学概论", "媒介伦理"])
        },
        { "外国语学院", (["英语", "日语"], ["语言学概论", "翻译理论与实践", "口译与笔译", "外国文学"]) },
        {
            "社会学与政治学院",
            (["社会学", "政治学与行政学", "公共事业管理"], ["社会学概论", "社会调查方法", "政治学原理", "公共管理学", "社会统计学"])
        },
        { "历史学院", (["历史学", "考古学"], ["中国古代史", "世界史", "史学概论", "历史文献学", "考古学原理"]) },
        { "哲学学院", (["哲学", "逻辑学"], ["中国哲学史", "西方哲学史", "伦理学", "逻辑学", "哲学导论"]) },
        { "马克思主义学院", ([], ["思想道德与法治", "中国近现代史纲要", "马克思主义基本原理", "毛泽东思想和中国特色社会主义理论体系概论", "形势与政策"]) },
        { "体育部", ([], ["大学体育", "健康教育", "体育与健身"]) },
        { "外语教学部", ([], ["大学英语", "英语视听说", "英语写作"]) },
        { "通识教育中心", ([], ["大学语文", "科学技术导论", "美学概论", "职业发展与就业指导"]) },
        { "数学与计算基础教学部", ([], ["高等数学", "线性代数", "大学计算机基础", "Python程序设计"]) }
    };

    private static IEnumerable<Department> GenerateDepartments()
    {
        var departmentId = 1L;
        foreach (var department in SampleDepartments)
        {
            var d = new Department { Name = department.Key };
            var majorId = departmentId * 100 + 1;
            foreach (var major in department.Value.Item1)
            {
                d.Majors.Add(new Major(majorId) { Name = major, Owner = d });
                majorId++;
            }

            var subjectId = departmentId * 100 + 1;
            foreach (var subject in department.Value.Item2)
            {
                d.Subjects.Add(new Subject(subjectId) { Name = subject, Owner = d });
                subjectId++;
            }

            yield return d;
            departmentId++;
        }
    }

    public async Task<int> GenerateDemoDataAsync(CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        // fix security stamp and password hash for test, DO NOT MODIFY
        const string securityStamp = "bdf61e19-9203-408e-bfc5-8aa677c32cd1";
        var passwordHash = passwordHasher.HashPassword(new User(), "123456");

        var departments = GenerateDepartments().ToArray();

        var teachers = new Faker<Teacher>("zh_CN")
            .RuleFor(t => t.Name, f => $"{f.Name.LastName()}{f.Name.FirstName()}")
            .RuleFor(t => t.Email, f => f.Internet.Email().OrNull(f, 0.4f))
            .RuleFor(t => t.Id, f => f.IndexFaker + 100000L)
            .RuleFor(t => t.Department, f => f.PickRandom(departments))
            .RuleFor(t => t.SecurityStamp, _ => securityStamp)
            .RuleFor(u => u.PasswordHash, _ => passwordHash)
            .Generate(400);

        var classTeacherFaker = new Faker();
        var classes = departments.SelectMany(d => d.Majors)
            .SelectMany(m => Enumerable.Range(21, 5)
                .SelectMany(y => Enumerable.Range(1, Random.Shared.Next(2, 4))
                    .Select(n => new Class
                    {
                        Name = $"{m.Name}{y.ToString()}{n.ToString().PadLeft(2, '0')}",
                        Major = m,
                        Owner = classTeacherFaker.PickRandom(teachers)
                    }))
            ).ToArray();

        var students = new Faker<Student>("zh_CN")
            .RuleFor(s => s.Name, f => $"{f.Name.LastName()}{f.Name.FirstName()}")
            .RuleFor(s => s.Email, f => f.Internet.Email().OrNull(f, 0.4f))
            .RuleFor(s => s.Id, f => f.IndexFaker + 1000000000L)
            .RuleFor(s => s.Class, f => f.PickRandom(classes))
            .RuleFor(t => t.SecurityStamp, _ => securityStamp)
            .RuleFor(u => u.PasswordHash, _ => passwordHash)
            .Generate(15000);

        var admins = new Faker<Admin>("zh_CN")
            .RuleFor(a => a.Name, f => $"{f.Name.LastName()}{f.Name.FirstName()}")
            .RuleFor(a => a.Email, f => f.Internet.Email().OrNull(f, 0.4f))
            .RuleFor(a => a.Id, f => f.IndexFaker + 10000L)
            .RuleFor(t => t.SecurityStamp, _ => securityStamp)
            .RuleFor(u => u.PasswordHash, _ => passwordHash)
            .Generate(5)!;
        var courses = new Faker<Course>()
            .RuleFor(c => c.Owner, f => f.PickRandom(teachers))
            .RuleFor(c => c.Subject, (f, c) => f.PickRandom(c.Owner!.Department?.Subjects))
            .RuleFor(c => c.Locked, f => f.Random.Bool(0.7f))
            .Generate(1000);

        // Conflict-aware schedule generation
        var rand = new Random(); // main-thread RNG for sequential parts (supplement stage)
        var threadRand = new ThreadLocal<Random>(() =>
            new Random(unchecked(Environment.TickCount * 31 + Guid.NewGuid().GetHashCode())));

        var rooms = Enumerable.Range(1, 5)
            .SelectMany(b => Enumerable.Range(101, 50).Select(r => $"{b}号楼{r}教室"))
            .ToArray();

        // day weights: Mon-Fri = 1.0, Sat/Sun = 0.2 (0-based: 0=Mon, 5=Sat,6=Sun)
        var dayWeights = new[] { 1.0, 1.0, 1.0, 1.0, 1.0, 0.2, 0.2 };

        //var teacherOccupancy = new Dictionary<long, HashSet<string>>();
        //var roomOccupancy = new Dictionary<string, HashSet<string>>();

        // Use bitsets for time slots to speed up conflict checks (memory-optimized but still small)
        const int WEEKS = 20;
        const int DAYS = 7;
        const int SECTIONS = 10;
        const int TOTAL_SLOTS = WEEKS * DAYS * SECTIONS; // 1400
        const int BLOCKS = (TOTAL_SLOTS + 63) / 64; // number of 64-bit blocks

        // tiny fast bitset using ulong[]
        static ulong[] NewBitBlocks()
        {
            return new ulong[BLOCKS];
        }

        static void SetBit(ulong[] blocks, int index)
        {
            var block = index >> 6; // /64
            var bit = (uint)(index & 63);
            blocks[block] |= 1UL << (int)bit;
        }

        static bool Intersects(ulong[] a, ulong[] b)
        {
            for (var i = 0; i < BLOCKS; i++)
                if ((a[i] & b[i]) != 0UL)
                    return true;
            return false;
        }

        static void OrInto(ulong[] target, ulong[] src)
        {
            for (var i = 0; i < BLOCKS; i++) target[i] |= src[i];
        }

        // helper: convert ranges to bitset blocks
        // BitsetFromRanges: expect ranges to be 0-based (lower inclusive, upper exclusive).
        // For example a week range [0,2) maps to weeks 0 and 1.
        static ulong[] BitsetFromRanges(NpgsqlRange<int>[] weeks, NpgsqlRange<int>[] days,
            NpgsqlRange<int>[] sections)
        {
            var blocks = NewBitBlocks();
            var weekList = new List<int>();
            var dayList = new List<int>();
            var secList = new List<int>();

            foreach (var w in weeks)
            {
                var lower = Math.Max(0, w.LowerBound);
                var upperExclusive = Math.Max(w.UpperBound, w.LowerBound + 1);
                for (var i = lower; i < upperExclusive; i++) weekList.Add(i);
            }

            foreach (var d in days)
            {
                var lower = Math.Max(0, d.LowerBound);
                var upperExclusive = Math.Max(d.UpperBound, d.LowerBound + 1);
                for (var i = lower; i < upperExclusive; i++) dayList.Add(i);
            }

            foreach (var s in sections)
            {
                var lower = Math.Max(0, s.LowerBound);
                var upperExclusive = Math.Max(s.UpperBound, s.LowerBound + 1);
                for (var i = lower; i < upperExclusive; i++) secList.Add(i);
            }

            foreach (var w in weekList)
            foreach (var d in dayList)
            foreach (var s in secList)
            {
                // now weeks/days/sections are 0-based, map directly
                var wi = w;
                var di = d;
                var si = s;
                var index = wi * DAYS * SECTIONS + di * SECTIONS + si;
                if (index >= 0 && index < TOTAL_SLOTS) SetBit(blocks, index);
            }

            return blocks;
        }

        var teacherOccupancy = new ConcurrentDictionary<long, ulong[]>();
        var roomOccupancy = new ConcurrentDictionary<string, ulong[]>();
        var scheduleBitsets = new ConcurrentDictionary<Schedule, ulong[]>();

        var schedules = new ConcurrentBag<Schedule>();

        // locks for deterministic multi-lock acquisition
        var resourceLocks = new ConcurrentDictionary<string, object>();

        static object GetLock(ConcurrentDictionary<string, object> dict, string key)
        {
            return dict.GetOrAdd(key, _ => new object());
        }

        // parallel schedule generation across courses
        Parallel.ForEach(courses, course =>
        {
            var teacher = course.Owner!;
            var tid = teacher.Id;
            if (tid == 0L) return;

            var tOcc = teacherOccupancy.GetOrAdd(tid, _ => NewBitBlocks());

            var scCountLocal = threadRand.Value!.Next(1, 3);
            for (var sc = 0; sc < scCountLocal; sc++)
            {
                var placed = false;
                for (var attempt = 0; attempt < 30 && !placed; attempt++)
                {
                    var weeks = GenerateSchedule(new Faker(), WEEKS);
                    var days = GenerateDaySchedule(new Faker(), DAYS, dayWeights);
                    var sections = GenerateCompactSchedule(new Faker(), SECTIONS, 2);

                    var bits = BitsetFromRanges(weeks, days, sections);
                    // skip empty
                    var empty = true;
                    for (var i = 0; i < BLOCKS; i++)
                        if (bits[i] != 0UL)
                        {
                            empty = false;
                            break;
                        }

                    if (empty) continue;

                    var room = rooms[threadRand.Value!.Next(rooms.Length)];

                    // acquire locks in deterministic order to avoid deadlock: compare keys
                    var tKey = $"T:{tid}";
                    var rKey = $"R:{room}";
                    object firstLock, secondLock;
                    if (string.CompareOrdinal(tKey, rKey) < 0)
                    {
                        firstLock = GetLock(resourceLocks, tKey);
                        secondLock = GetLock(resourceLocks, rKey);
                    }
                    else
                    {
                        firstLock = GetLock(resourceLocks, rKey);
                        secondLock = GetLock(resourceLocks, tKey);
                    }

                    lock (firstLock)
                    {
                        lock (secondLock)
                        {
                            // refresh occupancy references under lock
                            tOcc = teacherOccupancy.GetOrAdd(tid, _ => NewBitBlocks());
                            var rOcc = roomOccupancy.GetOrAdd(room, _ => NewBitBlocks());

                            if (Intersects(tOcc, bits)) continue;
                            if (Intersects(rOcc, bits)) continue;

                            var s = new Schedule
                            {
                                Owner = course,
                                Location = room,
                                Weeks = weeks,
                                Days = days,
                                Sections = sections
                            };
                            lock (course.Schedules)
                            {
                                course.Schedules.Add(s);
                            }

                            schedules.Add(s);
                            scheduleBitsets[s] = bits;

                            OrInto(tOcc, bits);
                            OrInto(rOcc, bits);

                            placed = true;
                        }
                    }
                }
            }
        });

        // prepare course->schedule bitsets list for quick checks
        var courseScheduleBits = new Dictionary<Course, List<ulong[]>>();
        foreach (var c in courses)
        {
            var list = new List<ulong[]>();
            foreach (var s in c.Schedules)
                if (scheduleBitsets.TryGetValue(s, out var b))
                    list.Add(b);
            if (list.Count > 0) courseScheduleBits[c] = list;
        }

        // list of courses that actually have schedules (used for student enrollment)
        var coursesWithSchedules = courseScheduleBits.Keys.ToList();

        // assign capacities to courses (for realism) and create index mapping
        var courseIndex = coursesWithSchedules.Select((c, i) => new { c, i })
            .ToDictionary(x => x.c, x => x.i);
        var courseRemaining = new int[coursesWithSchedules.Count];
        for (var i = 0; i < courseRemaining.Length; i++)
            courseRemaining[i] = rand.Next(30, 201); // 30..200 capacity

        // student occupancy: map student index to bitset for ultra-fast checks
        var studentIndex = new Dictionary<long, int>();
        for (var i = 0; i < students.Count; i++) studentIndex[students[i].Id] = i;
        var studentBits = new ulong[students.Count][];
        for (var i = 0; i < students.Count; i++) studentBits[i] = NewBitBlocks();

        var enrollmentsBag = new ConcurrentBag<Enrollment>();

        // parallel per-student enrollment (each student independent)
        Parallel.ForEach(students, student =>
        {
            var want = threadRand.Value!.Next(4, 9);
            var chosen = new HashSet<Course>();
            var attempts = 0;
            var sIdx = studentIndex[student.Id];
            var sBits = studentBits[sIdx];
            var localEnrollments = new List<Enrollment>();

            while (chosen.Count < want && attempts < want * 10)
            {
                attempts++;
                var cand = coursesWithSchedules[threadRand.Value!.Next(coursesWithSchedules.Count)];
                if (chosen.Contains(cand)) continue;
                var conflict = false;
                foreach (var cb in courseScheduleBits[cand])
                    if (Intersects(cb, sBits))
                    {
                        conflict = true;
                        break;
                    }

                if (conflict) continue;

                // attempt to reserve a slot atomically
                if (!courseIndex.TryGetValue(cand, out var cid)) continue;
                var rem = Interlocked.Decrement(ref courseRemaining[cid]);
                if (rem < 0)
                {
                    Interlocked.Increment(ref courseRemaining[cid]);
                    continue;
                }

                chosen.Add(cand);
                localEnrollments.Add(new Enrollment
                {
                    Owner = student, Course = cand, Locked = cand.Locked
                });

                foreach (var cb in courseScheduleBits[cand]) OrInto(sBits, cb);
            }

            foreach (var e in localEnrollments) enrollmentsBag.Add(e);
        });

        // convert bag to list for supplement stage and DB insert
        var enrollmentsList = enrollmentsBag.ToList();

        // prepare fast membership lookup per student to avoid O(N) Any checks
        var studentCourseIds = new HashSet<int>[students.Count];
        for (var i = 0; i < students.Count; i++) studentCourseIds[i] = new HashSet<int>();
        // populate from existing enrollments
        foreach (var e in enrollmentsList)
        {
            if (!courseIndex.TryGetValue(e.Course, out var cid)) continue;
            var sid = studentIndex[e.Owner.Id];
            studentCourseIds[sid].Add(cid);
        }

        // Supplement to reach a target count while still avoiding conflicts
        var target = 100000;
        var tries = 0;
        while (enrollmentsList.Count < target && tries < 300000)
        {
            tries++;
            var studentIdxRand = rand.Next(students.Count);
            var student = students[studentIdxRand];
            var course = coursesWithSchedules[rand.Next(coursesWithSchedules.Count)];
            if (!courseIndex.TryGetValue(course, out var cid)) continue;
            if (studentCourseIds[studentIdxRand].Contains(cid)) continue;
            var sBits = studentBits[studentIdxRand];
            var conflict = false;
            foreach (var cb in courseScheduleBits[course])
                if (Intersects(cb, sBits))
                {
                    conflict = true;
                    break;
                }

            if (conflict) continue;
            // reserve slot atomically
            var rem2 = Interlocked.Decrement(ref courseRemaining[cid]);
            if (rem2 < 0)
            {
                Interlocked.Increment(ref courseRemaining[cid]);
                continue;
            }

            enrollmentsList.Add(new Enrollment
            {
                Owner = student, Course = course, Locked = course.Locked
            });
            studentCourseIds[studentIdxRand].Add(cid);
            foreach (var cb in courseScheduleBits[course]) OrInto(sBits, cb);
        }

        var enrollments = enrollmentsList.ToArray();

        await context.AddRangeAsync(departments, token);
        await context.AddRangeAsync(teachers, token);
        await context.AddRangeAsync(classes, token);
        await context.AddRangeAsync(students, token);
        await context.AddRangeAsync(admins, token);
        await context.AddRangeAsync(courses, token);
        await context.AddRangeAsync(enrollments, token);
        await context.AddRangeAsync(schedules, token);
        return await context.SaveChangesAsync(token);

        NpgsqlRange<int>[] GenerateSchedule(Faker f, int max)
        {
            var ranges = new List<NpgsqlRange<int>>();
            // generate 0-based ranges where upper is exclusive to match BitsetFromRanges
            // weeks: uniform
            var count = f.Random.Int(1, 3);
            for (var i = 0; i < count; i++)
            {
                var start = f.Random.Int(0, Math.Max(0, max - 1));
                var end = f.Random.Int(start + 1, max);
                ranges.Add(new NpgsqlRange<int>(start, true, end, false));
            }

            return ranges.ToArray();
        }

        // Weighted start selector: picks a start index in [0, max-length] using baseWeights for indices
        int WeightedStart(Faker f, double[] baseWeights, int max, int length)
        {
            var limit = Math.Max(0, max - length);
            if (limit == 0) return 0;
            // compute cumulative weights for possible starts 0..limit
            var total = 0.0;
            var cum = new double[limit + 1];
            for (var i = 0; i <= limit; i++)
            {
                var w = i < baseWeights.Length ? baseWeights[i] : 1.0;
                total += w;
                cum[i] = total;
            }

            var r = f.Random.Double() * total;
            for (var i = 0; i <= limit; i++)
                if (r < cum[i])
                    return i;
            return limit;
        }

        NpgsqlRange<int>[] GenerateCompactSchedule(Faker f, int max, int maxLength)
        {
            var ranges = new List<NpgsqlRange<int>>();
            // days and sections should be chosen with bias: days bias lower on weekends; sections bias lower on last two
            // base weights for days: Mon-Fri = 1.0, Sat/Sun = 0.2
            var dayWeights = new[] { 1.0, 1.0, 1.0, 1.0, 1.0, 0.2, 0.2 };
            // base weights for sections (0..max-1): last two sections lower weight
            var sectionWeights = new double[max];
            for (var si = 0; si < max; si++)
                sectionWeights[si] = si >= Math.Max(0, max - 2) ? 0.3 : 1.0;

            var count = f.Random.Int(1, 2); // fewer ranges
            for (var i = 0; i < count; i++)
            {
                var length = f.Random.Int(1, Math.Max(1, maxLength));
                // pick start biased by weights
                var start = WeightedStart(f, sectionWeights, max, length);
                var end = Math.Min(start + length, max); // exclusive upper bound
                ranges.Add(new NpgsqlRange<int>(start, true, end, false));
            }

            return ranges.ToArray();
        }

        NpgsqlRange<int>[] GenerateDaySchedule(Faker f, int max, double[] baseWeights)
        {
            var ranges = new List<NpgsqlRange<int>>();
            // typically a course occurs on a single weekday; allow 1 range of length 1
            var count = f.Random.Int(1, 1);
            for (var i = 0; i < count; i++)
            {
                var length = 1;
                var start = WeightedStart(f, baseWeights, max, length);
                var end = Math.Min(start + length, max);
                ranges.Add(new NpgsqlRange<int>(start, true, end, false));
            }

            return ranges.ToArray();
        }
    }
}
