import { PrismaClient, Role, JobType, ApplicationStatus, InterviewType,InterviewRecommendation,InterviewStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (in reverse order of dependencies)
  console.log('🗑️  Clearing existing data...');
  await prisma.blacklist.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.savedJob.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleared');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users
  console.log('👤 Creating users...');
  const admin = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@jobsportal.com',
      password: hashedPassword,
      role: Role.admin,
      profileSummary: 'System administrator',
      phone: '+1234567890',
      isVerified: true,
    },
  });

  const recruiter1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Recruiter',
      email: 'john.recruiter@techcorp.com',
      password: hashedPassword,
      role: Role.recruiter,
      profileSummary: 'Senior Talent Acquisition Specialist',
      phone: '+1234567891',
      isVerified: true,
    },
  });

  const recruiter2 = await prisma.user.create({
    data: {
      firstName: 'Sarah',
      lastName: 'Manager',
      email: 'sarah.manager@innovate.com',
      password: hashedPassword,
      role: Role.recruiter,
      profileSummary: 'HR Manager',
      phone: '+1234567892',
      isVerified: true,
    },
  });

  const candidate1 = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Developer',
      email: 'alice.developer@email.com',
      password: hashedPassword,
      role: Role.candidate,
      profileSummary:
        'Full-stack developer with 5 years of experience in React, Node.js, and TypeScript',
      resumeUrl: 'https://example.com/resumes/alice.pdf',
      address: '123 Main St, San Francisco, CA 94102',
      phone: '+1234567893',
      isVerified: true,
    },
  });

  const candidate2 = await prisma.user.create({
    data: {
      firstName: 'Bob',
      lastName: 'Engineer',
      email: 'bob.engineer@email.com',
      password: hashedPassword,
      role: Role.candidate,
      profileSummary:
        'Backend engineer specializing in microservices and cloud architecture',
      resumeUrl: 'https://example.com/resumes/bob.pdf',
      address: '456 Oak Ave, New York, NY 10001',
      phone: '+1234567894',
      isVerified: true,
    },
  });

  const candidate3 = await prisma.user.create({
    data: {
      firstName: 'Charlie',
      lastName: 'Designer',
      email: 'charlie.designer@email.com',
      password: hashedPassword,
      role: Role.candidate,
      profileSummary:
        'UI/UX designer with expertise in design systems and user research',
      resumeUrl: 'https://example.com/resumes/charlie.pdf',
      address: '789 Pine Rd, Seattle, WA 98101',
      phone: '+1234567895',
      isVerified: true,
    },
  });

  const candidate4 = await prisma.user.create({
    data: {
      firstName: 'Diana',
      lastName: 'Analyst',
      email: 'diana.analyst@email.com',
      password: hashedPassword,
      role: Role.candidate,
      profileSummary:
        'Data analyst with experience in Python, SQL, and machine learning',
      resumeUrl: 'https://example.com/resumes/diana.pdf',
      address: '321 Elm St, Austin, TX 78701',
      phone: '+1234567896',
      isVerified: true,
    },
  });

  const candidate5 = await prisma.user.create({
    data: {
      firstName: 'Eve',
      lastName: 'Developer',
      email: 'eve.developer@email.com',
      password: hashedPassword,
      role: Role.candidate,
      profileSummary:
        'Frontend developer passionate about React, Vue, and modern web technologies',
      resumeUrl: 'https://example.com/resumes/eve.pdf',
      address: '654 Maple Dr, Boston, MA 02101',
      phone: '+1234567897',
      isVerified: true,
    },
  });

  console.log(`✅ Created ${8} users`);

  // Create Companies
  console.log('🏢 Creating companies...');
  const company1 = await prisma.company.create({
    data: {
      name: 'TechCorp Solutions',
      description:
        'Leading technology solutions provider specializing in enterprise software development',
      industry: 'Technology',
      website: 'https://techcorp.com',
      logoUrl: 'https://example.com/logos/techcorp.png',
      createdById: recruiter1.id,
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Innovate Labs',
      description:
        'Innovative startup focused on AI and machine learning solutions',
      industry: 'Artificial Intelligence',
      website: 'https://innovatelabs.com',
      logoUrl: 'https://example.com/logos/innovatelabs.png',
      createdById: recruiter2.id,
    },
  });

  const company3 = await prisma.company.create({
    data: {
      name: 'Cloud Systems Inc',
      description: 'Cloud infrastructure and DevOps services provider',
      industry: 'Cloud Computing',
      website: 'https://cloudsystems.com',
      logoUrl: 'https://example.com/logos/cloudsystems.png',
      createdById: recruiter1.id,
    },
  });

  const company4 = await prisma.company.create({
    data: {
      name: 'Digital Marketing Pro',
      description: 'Full-service digital marketing agency',
      industry: 'Marketing',
      website: 'https://digitalmarketingpro.com',
      logoUrl: 'https://example.com/logos/digitalmarketing.png',
      createdById: recruiter2.id,
    },
  });

  console.log(`✅ Created ${4} companies`);

  // Create Jobs
  console.log('💼 Creating jobs...');
  const job1 = await prisma.job.create({
    data: {
      title: 'Senior Full-Stack Developer',
      description:
        'We are looking for an experienced full-stack developer to join our team. You will work on building scalable web applications using React, Node.js, and TypeScript.',
      location: 'San Francisco, CA',
      jobType: JobType.FULL_TIME,
      salary: 120000,
      industry: 'Technology',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      year: 5,
      budget: 150000,
      comments: 'Remote work available',
      createdById: recruiter1.id,
      companyId: company1.id,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: 'Backend Engineer',
      description:
        'Join our backend team to build robust APIs and microservices. Experience with distributed systems and cloud platforms required.',
      location: 'New York, NY',
      jobType: JobType.FULL_TIME,
      salary: 130000,
      industry: 'Technology',
      skills: ['Python', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      year: 4,
      budget: 160000,
      createdById: recruiter1.id,
      companyId: company1.id,
    },
  });

  const job3 = await prisma.job.create({
    data: {
      title: 'UI/UX Designer',
      description:
        'We are seeking a creative UI/UX designer to help shape the user experience of our products. Portfolio required.',
      location: 'Seattle, WA',
      jobType: JobType.FULL_TIME,
      salary: 95000,
      industry: 'Design',
      skills: [
        'Figma',
        'Adobe XD',
        'User Research',
        'Prototyping',
        'Design Systems',
      ],
      year: 3,
      budget: 110000,
      createdById: recruiter2.id,
      companyId: company2.id,
    },
  });

  const job4 = await prisma.job.create({
    data: {
      title: 'Data Analyst',
      description:
        'Analyze complex datasets and provide insights to drive business decisions. Experience with Python and SQL required.',
      location: 'Austin, TX',
      jobType: JobType.FULL_TIME,
      salary: 85000,
      industry: 'Data Analytics',
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'Statistics'],
      year: 2,
      budget: 100000,
      createdById: recruiter2.id,
      companyId: company2.id,
    },
  });

  const job5 = await prisma.job.create({
    data: {
      title: 'Frontend Developer',
      description:
        'Build beautiful and responsive user interfaces using modern frontend frameworks. React or Vue experience preferred.',
      location: 'Boston, MA',
      jobType: JobType.FULL_TIME,
      salary: 100000,
      industry: 'Technology',
      skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'TypeScript'],
      year: 3,
      budget: 120000,
      createdById: recruiter1.id,
      companyId: company3.id,
    },
  });

  const job6 = await prisma.job.create({
    data: {
      title: 'DevOps Engineer',
      description:
        'Manage our cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes required.',
      location: 'Remote',
      jobType: JobType.REMOTE,
      salary: 115000,
      industry: 'Cloud Computing',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
      year: 4,
      budget: 140000,
      createdById: recruiter1.id,
      companyId: company3.id,
    },
  });

  const job7 = await prisma.job.create({
    data: {
      title: 'Marketing Intern',
      description:
        'Great opportunity for students to gain experience in digital marketing. Part-time position.',
      location: 'Remote',
      jobType: JobType.INTERN,
      salary: 20000,
      industry: 'Marketing',
      skills: ['Social Media', 'Content Writing', 'SEO', 'Analytics'],
      year: 0,
      budget: 25000,
      createdById: recruiter2.id,
      companyId: company4.id,
    },
  });

  const job8 = await prisma.job.create({
    data: {
      title: 'Contract Frontend Developer',
      description:
        '6-month contract position for a frontend developer to work on a specific project.',
      location: 'Remote',
      jobType: JobType.CONTRACT,
      salary: 80000,
      industry: 'Technology',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      year: 2,
      budget: 95000,
      createdById: recruiter2.id,
      companyId: company4.id,
    },
  });

// const application2 = await prisma.application.create({
//   data: {
//     userId: candidate2.id,
//     jobId: job1.id,
//     status: 'APPLIED',
//   },
// });

// const application3 = await prisma.application.create({
//   data: {
//     userId: candidate3.id,
//     jobId: job2.id,
//     status: 'APPLIED',
//   },
// });


console.log('✅ Created application1');


  console.log(`✅ Created ${8} jobs`);

  // Create Applications (Many users applying to many jobs)
  console.log('📝 Creating applications...');

  // Alice applies to multiple jobs
  const app1 = await prisma.application.create({
    data: {
      userId: candidate1.id,
      jobId: job1.id,
      status: ApplicationStatus.PENDING,
      coverLetter:
        'I am excited to apply for this position. I have 5 years of experience in full-stack development.',
      resumeUrl: 'https://example.com/resumes/alice.pdf',
      gpa: 3.8,
      skillSummary: 'Expert in React, Node.js, TypeScript, and PostgreSQL',
    },
  });

  const app2 = await prisma.application.create({
    data: {
      userId: candidate1.id,
      jobId: job5.id,
      status: ApplicationStatus.SHORTLISTED,
      coverLetter: 'I am very interested in this frontend developer position.',
      resumeUrl: 'https://example.com/resumes/alice.pdf',
      gpa: 3.8,
    },
  });

  // Bob applies to multiple jobs
  const app3 = await prisma.application.create({
    data: {
      userId: candidate2.id,
      jobId: job2.id,
      status: ApplicationStatus.PENDING,
      coverLetter:
        'I have extensive experience in backend development and microservices.',
      resumeUrl: 'https://example.com/resumes/bob.pdf',
      gpa: 3.6,
      skillSummary: 'Strong background in Python, Docker, and Kubernetes',
    },
  });

  const app4 = await prisma.application.create({
    data: {
      userId: candidate2.id,
      jobId: job6.id,
      status: ApplicationStatus.SHORTLISTED,
      coverLetter: 'I am interested in this DevOps position.',
      resumeUrl: 'https://example.com/resumes/bob.pdf',
    },
  });

  // Charlie applies to jobs
  const app5 = await prisma.application.create({
    data: {
      userId: candidate3.id,
      jobId: job3.id,
      status: ApplicationStatus.PENDING,
      coverLetter: 'I am a passionate UI/UX designer with a strong portfolio.',
      resumeUrl: 'https://example.com/resumes/charlie.pdf',
      gpa: 3.9,
      skillSummary: 'Expert in Figma, user research, and design systems',
    },
  });

  // Diana applies to jobs
  const app6 = await prisma.application.create({
    data: {
      userId: candidate4.id,
      jobId: job4.id,
      status: ApplicationStatus.PENDING,
      coverLetter:
        'I have a strong background in data analysis and machine learning.',
      resumeUrl: 'https://example.com/resumes/diana.pdf',
      gpa: 3.7,
      skillSummary: 'Proficient in Python, SQL, and data visualization',
    },
  });

  const app7 = await prisma.application.create({
    data: {
      userId: candidate4.id,
      jobId: job2.id,
      status: ApplicationStatus.REJECTED,
      coverLetter: 'I am interested in backend engineering roles.',
      resumeUrl: 'https://example.com/resumes/diana.pdf',
    },
  });

  // Eve applies to multiple jobs
  const app8 = await prisma.application.create({
    data: {
      userId: candidate5.id,
      jobId: job5.id,
      status: ApplicationStatus.PENDING,
      coverLetter:
        'I am a frontend developer with experience in React and Vue.',
      resumeUrl: 'https://example.com/resumes/eve.pdf',
      gpa: 3.5,
    },
  });

  const app9 = await prisma.application.create({
    data: {
      userId: candidate5.id,
      jobId: job8.id,
      status: ApplicationStatus.SHORTLISTED,
      coverLetter: 'I am interested in this contract position.',
      resumeUrl: 'https://example.com/resumes/eve.pdf',
    },
  });

  // Multiple candidates apply to the same job (job1)
  const app10 = await prisma.application.create({
    data: {
      userId: candidate5.id,
      jobId: job1.id,
      status: ApplicationStatus.PENDING,
      coverLetter: 'I would love to work on full-stack projects.',
      resumeUrl: 'https://example.com/resumes/eve.pdf',
    },
  });

  console.log(`✅ Created ${10} applications`);

  // Create Saved Jobs
  console.log('⭐ Creating saved jobs...');
  await prisma.savedJob.create({
    data: {
      userId: candidate1.id,
      jobId: job2.id,
    },
  });

  await prisma.savedJob.create({
    data: {
      userId: candidate1.id,
      jobId: job6.id,
    },
  });

  await prisma.savedJob.create({
    data: {
      userId: candidate2.id,
      jobId: job1.id,
    },
  });

  await prisma.savedJob.create({
    data: {
      userId: candidate3.id,
      jobId: job5.id,
    },
  });

  await prisma.savedJob.create({
    data: {
      userId: candidate4.id,
      jobId: job3.id,
    },
  });

  await prisma.savedJob.create({
    data: {
      userId: candidate5.id,
      jobId: job4.id,
    },
  });

  console.log(`✅ Created ${6} saved jobs`);

  // Create Notifications
  // 🔔 Notifications Seed
  await prisma.notification.create({
    data: {
      userId: candidate4.id,
      message: 'Your application status has been updated',
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: candidate2.id,
      message: 'You have been invited to complete an assessment',
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: candidate3.id,
      message: 'Your interview has been scheduled',
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: recruiter1.id,
      message:
        'You have received 3 new applications for Senior Full-Stack Developer',
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: recruiter1.id,
      message: 'An assessment has been submitted by a candidate',
      isRead: true,
    },
  });

  await prisma.notification.create({
    data: {
      userId: recruiter2.id,
      message: 'New application received for UI/UX Designer position',
      isRead: true,
    },
  });

  await prisma.notification.create({
    data: {
      userId: admin.id,
      message: 'Daily platform activity summary is ready',
      isRead: false,
    },
  });

  console.log(`✅ Created 7 notifications`);

  // 📝 Assessments
  const assessment1 = await prisma.assessment.create({
    data: {
      title: 'Frontend Technical Assessment',
      description: 'Basic React & JavaScript skills test',
      createdById: recruiter2.id,
      applicationId: app2.id,
    },
  });

  const question1 = await prisma.assessmentQuestion.create({
    data: {
      assessmentId: assessment1.id,
      questionText: 'Explain React hooks',
      type: 'TEXT',
      order: 1,
    },
  });

  const question2 = await prisma.assessmentQuestion.create({
    data: {
      assessmentId: assessment1.id,
      questionText: 'Have you worked with TypeScript?',
      type: 'BOOLEAN',
      order: 2,
    },
  });

  // 📤 Assessment Submission
  const submission1 = await prisma.assessmentSubmission.create({
    data: {
      assessmentId: assessment1.id,
      candidateId: candidate1.id,
      submittedAt: new Date(),
      status: 'SUBMITTED',
    },
  });

  await prisma.assessmentAnswer.create({
    data: {
      submissionId: submission1.id,
      questionId: question1.id,
      textAnswer:
        'Hooks allow state and lifecycle features in functional components.',
    },
  });

  await prisma.assessmentAnswer.create({
    data: {
      submissionId: submission1.id,
      questionId: question2.id,
      booleanAnswer: true,
    },
  });
  // 🎤 Interview
  const interview1 = await prisma.interview.create({
    data: {
      applicationId: app3.id,
      type: 'TECHNICAL',
      round: 1,
      status: 'SCHEDULED',
      scheduledAt: new Date(Date.now() + 86400000),
      durationMin: 60,
      createdById: recruiter2.id,
    },
  });

  await prisma.interviewInterviewer.create({
    data: {
      interviewId: interview1.id,
      interviewerId: recruiter2.id,
    },
  });

  await prisma.interviewFeedback.create({
    data: {
      interviewId: interview1.id,
      // type: InterviewType.MANAGERIAL,
      interviewerId: recruiter2.id,
      score: 8,
      recommendation: InterviewRecommendation.STRONG_YES,
      notes: 'Strong React fundamentals',
            
    },
  });
  // 💼 Offer
  const offer1 = await prisma.offer.create({
    data: {
      applicationId: app3.id,
      candidateId: candidate1.id,
      createdById: recruiter1.id,
      title: 'Senior Frontend Developer',
      employmentType: 'FULL_TIME',
      baseSalary: 95000,
      currency: 'USD',
      status: 'SENT',
      sentAt: new Date(),
    },
  });

  await prisma.offerHistory.create({
    data: {
      offerId: offer1.id,
      action: 'CREATED',
      createdById: recruiter1.id,
      notes: 'Initial offer sent',
    },
  });
  // 🔗 Referral
  await prisma.referral.create({
    data: {
      code: 'REF-FE-2026',
      referrerId: recruiter1.id,
      jobId: job1.id,
    },
  });

  console.log('\n✨ Database seeded successfully!');
  console.log('✅ Created assessments');
  console.log('✅ Created assessment submissions & answers');
  console.log('✅ Created interviews & feedback');
  console.log('✅ Created offers & offer history');
  console.log('✅ Created referrals');
  console.log('\n📊 Summary:');
  console.log(`   - Users: 8 (1 admin, 2 recruiters, 5 candidates)`);
  console.log(`   - Companies: 4`);
  console.log(`   - Jobs: 8`);
  console.log(`   - Applications: 10`);
  console.log(`   - Saved Jobs: 6`);
  console.log(`   - Notifications: 7`);
  console.log('\n🔑 Test Credentials:');
  console.log('   Admin: admin@jobsportal.com / password123');
  console.log('   Recruiter: john.recruiter@techcorp.com / password123');
  console.log('   Candidate: alice.developer@email.com / password123');
  
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
