#!/usr/bin/env python3
"""
Update Surah Yunus (10) tafsir summaries, lessons, and before/after flow.
Arabic and translation are left unchanged.
"""
import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "surah", "10.json")

# Improved content: ayah number -> { tafsirSummary, lessonReflection, beforeThisAyah, afterThisAyah }
UPDATES = {
    11: {
        "tafsirSummary": "If Allah were to hasten evil for people as they hasten good, their term would already be ended. Instead He leaves those who do not expect the meeting with Him in their transgression, wandering blindly—giving them time to repent, but they persist in error.",
        "lessonReflection": "Allah's delay of punishment is mercy and a respite; to use it to persist in transgression is to store up a worse reckoning.",
        "beforeThisAyah": "Paradise was described for the believers; now the surah contrasts Allah's wisdom in dealing with those who do not hope for the meeting.",
        "afterThisAyah": "The fickle nature of man is described: he calls on Allah in hardship then forgets when relieved.",
    },
    12: {
        "tafsirSummary": "When affliction touches a person, he calls on Allah from his side, sitting or standing. When Allah removes the affliction, he goes on as if he had never called. Thus Allah makes their deeds seem fair to the transgressors—their ingratitude and forgetfulness are part of their punishment.",
        "lessonReflection": "Crisis often brings us to our knees; the test is whether we remain close when the crisis passes.",
        "beforeThisAyah": "Allah's wisdom in leaving the rejecters to wander was stated; now the surah describes the pattern of human ingratitude.",
        "afterThisAyah": "Past generations are recalled: they were destroyed when they wronged and rejected their messengers.",
    },
    13: {
        "tafsirSummary": "Allah destroyed generations before the people of Mecca when they wronged. Their messengers came with clear proofs, but they would not believe. Thus Allah requites the people who are criminals (mujrimūn)—the pattern is consistent so that the present generation may take heed.",
        "lessonReflection": "History is not random; the same pattern of rejection and destruction repeats until we learn.",
        "beforeThisAyah": "The pattern of man calling in hardship then forgetting was described; now the fate of past nations is stated.",
        "afterThisAyah": "The current generation is told they were made successors in the land so that Allah may see how they act.",
    },
    14: {
        "tafsirSummary": "After destroying the former nations, Allah made the addressees successors (khalāʾif) in the land—to observe how they would act. The succession is both a trust and a test; they are accountable for what they do with it.",
        "lessonReflection": "We are not the first; we are successors. What we do with the land and the message will be observed and judged.",
        "beforeThisAyah": "Past generations were destroyed for wronging and rejecting their messengers; now the present one is placed in their stead.",
        "afterThisAyah": "The demand of the rejecters for a different Qur'an or changes is reported, and the Prophet's response is given.",
    },
    15: {
        "tafsirSummary": "When Our clear verses are recited, those who do not expect the meeting with Us say: bring another Qur'an or change this one. The Prophet is told to say: I have no right to change it on my own; I only follow what is revealed to me; I fear the punishment of a tremendous Day if I disobey my Lord.",
        "lessonReflection": "Revelation is not negotiable; the messenger's role is to convey, not to alter—and to fear the One who sent it.",
        "beforeThisAyah": "The people were made successors to see how they act; now their demand for a different scripture is addressed.",
        "afterThisAyah": "The Prophet is told to say that if Allah had willed he would not have recited the Qur'an to them.",
    },
    16: {
        "tafsirSummary": "The Prophet is told to say: If Allah had willed, I would not have recited it to you nor made it known to you; I lived among you a lifetime before it—so will you not reason? His life before prophethood is proof that the Qur'an is not his own composition.",
        "lessonReflection": "The Prophet's known character and the sudden change with revelation are themselves a sign for those who reason.",
        "beforeThisAyah": "The Prophet declared he only follows revelation and fears his Lord; now he is given another argument from his own history.",
        "afterThisAyah": "The surah asks who is more unjust than those who fabricate lies about Allah or deny His signs.",
    },
    17: {
        "tafsirSummary": "Who is more unjust than he who invents a lie against Allah or denies His signs? The criminals (mujrimūn) will not succeed (lā yufliḥūn)—their denial does not change the truth; it only seals their fate.",
        "lessonReflection": "Fabricating against Allah or denying His signs is the height of injustice; success belongs to the truthful and the believers.",
        "beforeThisAyah": "The Prophet's pre-revelation life was cited as evidence; now the gravity of denying or lying about the signs is stated.",
        "afterThisAyah": "The idolaters' worship of what neither harms nor benefits, and their claim of intercessors, are refuted.",
    },
    18: {
        "tafsirSummary": "They worship besides Allah what neither harms nor benefits them, and say: these are our intercessors with Allah. The Prophet is told to say: do you inform Allah of something He does not know in the heavens or the earth? He is exalted and high above what they associate with Him.",
        "lessonReflection": "Worship of powerless idols and the claim that they intercede with Allah are both false; Allah is above all association.",
        "beforeThisAyah": "The injustice of lying about Allah or denying His signs was stated; now the futility of shirk is exposed.",
        "afterThisAyah": "The surah recalls that mankind was one community then differed, and that Allah's prior word defers judgment.",
    },
    19: {
        "tafsirSummary": "Mankind was but one community (umma wāḥida), then they differed. Had it not been for a word that preceded from your Lord, they would have been judged immediately regarding their differences. Allah's decree gives them respite until an appointed term.",
        "lessonReflection": "Difference among people is old; what holds back immediate judgment is Allah's prior decree of respite, not His ignorance or indifference.",
        "beforeThisAyah": "Shirk was refuted; now the origin of human difference and the deferral of judgment are stated.",
        "afterThisAyah": "The demand for a sign from the Lord is reported, and the Prophet is told to say the unseen is only with Allah.",
    },
    20: {
        "tafsirSummary": "They say: why is a sign not sent down to him from his Lord? The Prophet is told to say: the unseen belongs only to Allah, so wait; I am with you among those who wait. The timing and form of signs are with Allah; the messenger does not control the unseen.",
        "lessonReflection": "Demanding signs on demand confuses the role of messenger and Lord; patience and waiting are the response.",
        "beforeThisAyah": "The one community and the deferred judgment were stated; now the demand for a sign is addressed.",
        "afterThisAyah": "When people receive mercy after hardship, they scheme against Our verses—and Allah is swifter in strategy.",
    },
    21: {
        "tafsirSummary": "When Allah gives people a taste of mercy after adversity, they at once scheme (makr) against Our verses. The Prophet is told to say: Allah is swifter in strategy. And Our messengers—the angels—record what they scheme. No plot escapes Allah.",
        "lessonReflection": "Mercy after hardship is a test; to respond with schemes against the verses is to invite a swifter, recorded reckoning.",
        "beforeThisAyah": "The Prophet was told to say the unseen is with Allah and to wait; now the response of people to mercy is described.",
        "afterThisAyah": "Allah's favour in enabling travel on land and sea is described, and the scene of distress at sea and sincere supplication.",
    },
    22: {
        "tafsirSummary": "Allah is the one who enables travel on land and sea. When they are in ships with a favourable wind and rejoice, a storm comes and waves from every side, and they think they are encompassed—then they call upon Allah, sincere to Him in religion: if You save us from this we will be among the thankful. Creation and crisis both point to Him.",
        "lessonReflection": "Travel, safety, and danger are in His hand; the moment of desperation often produces the sincerity that should have been constant.",
        "beforeThisAyah": "People's scheming after receiving mercy was described; now a vivid sign is given: travel and danger at sea.",
        "afterThisAyah": "But when He saves them, they again commit injustice on earth without right.",
    },
    23: {
        "tafsirSummary": "When He saves them, they immediately commit injustice (baghy) on earth without right. O mankind, your injustice is only against your own souls—it is the enjoyment of the life of this world. Then to Us is your return and We will inform you of what you used to do. The warning is direct: wrongdoing harms the self.",
        "lessonReflection": "Rescue does not guarantee gratitude or reform; injustice after mercy is self-harm and will be answered at the Return.",
        "beforeThisAyah": "The scene at sea—sincere supplication when in danger—was described; now the relapse after rescue is shown.",
        "afterThisAyah": "The parable of worldly life as rain, growth, and sudden harvest is given.",
    },
    24: {
        "tafsirSummary": "The likeness of the life of this world is rain We send down; the plants of the earth mingle with it; people and cattle eat from it; the earth takes its adornment and people suppose they have power over it—then Our command comes by night or day and We make it stubble as if it had not flourished yesterday. So We detail the signs for people who reflect.",
        "lessonReflection": "Worldly life is fleeting and subject to Allah's command; reflection on this parable strips away false security.",
        "beforeThisAyah": "After rescue, people's return to injustice was described; now worldly life itself is likened to a brief, fragile growth.",
        "afterThisAyah": "Allah invites to the Home of Peace and guides whom He wills to a straight path.",
    },
    25: {
        "tafsirSummary": "Allah invites to the Home of Peace (dār al-salām)—Paradise—and guides whom He wills to a straight path. The invitation is universal; the guidance is by His will. The path is clear for those He chooses to guide.",
        "lessonReflection": "The invitation is to the Home of Peace; the straight path is a gift of guidance—our part is to respond and follow.",
        "beforeThisAyah": "The parable of worldly life as fleeting growth was given; now the alternative is stated: the Home of Peace and the straight path.",
        "afterThisAyah": "The reward of those who did good and the recompense of those who did evil are contrasted.",
    },
    26: {
        "tafsirSummary": "For those who did good (aḥsanū) there is the best reward (al-ḥusnā) and more. No gloom will cover their faces nor humiliation. They are the companions of the Garden, abiding there forever. The \"and more\" (ziyāda) is the vision of Allah—the greatest increase.",
        "lessonReflection": "Good is repaid with the best and more; the faces of the people of the Garden are free of shame and darkness.",
        "beforeThisAyah": "Allah invited to the Home of Peace and the straight path; now the outcome for the doers of good is stated.",
        "afterThisAyah": "The opposite outcome—for those who earned evil deeds—is described.",
    },
    27: {
        "tafsirSummary": "Those who earned evil deeds receive the recompense of an evil like it; humiliation covers them; they have no protector from Allah; their faces are as if covered with strips of dark night. They are the companions of the Fire, abiding there forever. Justice is like for like; the imagery of darkness contrasts with the light of the Garden.",
        "lessonReflection": "Evil is requited in kind; humiliation and the absence of any protector await—the face reflects the state of the soul.",
        "beforeThisAyah": "The reward and honour of the people of the Garden were described; now the recompense of the evildoers is stated.",
        "afterThisAyah": "The Day of Gathering is described: associators are told to remain with their partners, who then disown them.",
    },
    28: {
        "tafsirSummary": "On the Day We gather them all, We say to those who associated others with Allah: remain in your place, you and your partners. Then We separate them. Their partners say: you did not worship us—so Allah is sufficient as witness between us and you that we were unaware of your worship.",
        "lessonReflection": "On the Day, the false gods will disown their worshippers; the only witness needed is Allah.",
        "beforeThisAyah": "The companions of the Fire were described; now the scene of the Gathering and the exposure of shirk is shown.",
        "afterThisAyah": "The \"partners\" declare they were unaware of being worshipped; Allah is sufficient as witness.",
    },
    29: {
        "tafsirSummary": "The false gods say: sufficient is Allah as a witness between us and you—we were unaware of your worship. The idolaters are left with no excuse; the ones they worshipped disown them and Allah is the witness against them.",
        "lessonReflection": "The gods they invoked will deny them; Allah's witness is sufficient to seal the matter.",
        "beforeThisAyah": "The associators were told to remain with their partners; the partners disown the worship.",
        "afterThisAyah": "There every soul is tried for what it sent ahead, and they are returned to Allah their true Master.",
    },
    30: {
        "tafsirSummary": "There (hunālika) every soul is tried (tablū) for what it sent ahead; they are returned to Allah, their true Master (mawlāhum al-ḥaqq); and what they used to invent is lost from them. The trial is of deeds; the return is to the only real Master; false claims fall away.",
        "lessonReflection": "On that Day each soul faces what it did; the only Master is Allah, and all inventions of shirk are lost.",
        "beforeThisAyah": "The partners declared they were unaware of being worshipped; now the trial and return to Allah are stated.",
        "afterThisAyah": "The Prophet is told to ask: who provides for you, who controls hearing and sight, who gives life and death, who directs all affairs? They will say Allah—then will you not fear Him?",
    },
    31: {
        "tafsirSummary": "The Prophet is told to ask: who provides for you from the heaven and the earth? Who has power over hearing and sight? Who brings the living out of the dead and the dead out of the living? Who directs the affair? They will say: Allah. Then say: so will you not fear Him? The logical conclusion from their own admission is taqwā.",
        "lessonReflection": "When they acknowledge Allah as Provider and Sovereign, the next step is to fear Him and worship Him alone.",
        "beforeThisAyah": "Every soul was said to be tried and returned to Allah; now the addressees are asked to acknowledge who sustains and governs.",
        "afterThisAyah": "That is Allah your Lord, the Truth; beyond truth is only misguidance—so how are you turned away?",
    },
    32: {
        "tafsirSummary": "That is Allah, your Lord, the Truth (al-ḥaqq). What is there beyond the truth except error? So how are you averted (tuṣrafūn)? Once the truth is named, deviation is indefensible.",
        "lessonReflection": "Allah is the Truth; to turn away from Him is to choose misguidance—the verse asks how such aversion is possible.",
        "beforeThisAyah": "They were led to say Allah and asked will you not fear Him; now He is named as the Truth and their aversion is questioned.",
        "afterThisAyah": "The word of your Lord is fulfilled against those who transgress: they will not believe.",
    },
    33: {
        "tafsirSummary": "Thus the word of your Lord has come true against those who transgressed (fasaqū)—that they would not believe. Their persistent transgression leads to the divine decree that they will not believe; the heart is sealed as a consequence of their choices.",
        "lessonReflection": "Transgression leads to the sealing of the heart; the word of the Lord is fulfilled—belief is then no longer possible for them.",
        "beforeThisAyah": "Allah was declared the Truth and their aversion was questioned; now the consequence for the transgressors is stated.",
        "afterThisAyah": "The Prophet is told to ask: can any of your partners originate creation then repeat it? Only Allah does so.",
    },
    34: {
        "tafsirSummary": "Say: among your partners, is there any who begins creation then repeats it? Say: Allah begins creation then repeats it—so how are you deluded (tuʾfakūn)? Creation and resurrection are Allah's alone; the idols have no share in either.",
        "lessonReflection": "Only Allah originates and restores creation; to ascribe partners to Him in that is sheer delusion.",
        "beforeThisAyah": "The word of the Lord was said to be fulfilled against the transgressors; now the inability of the partners to create or resurrect is stressed.",
        "afterThisAyah": "The Prophet is told to ask: who among your partners guides to the truth? Only Allah guides to the truth.",
    },
    35: {
        "tafsirSummary": "Say: among your partners, is there any who guides to the truth? Say: Allah guides to the truth. Is He who guides to the truth more worthy to be followed, or he who does not guide unless he is guided? What is wrong with you—how do you judge? The argument is from reason: follow the one who guides.",
        "lessonReflection": "Guidance to the truth comes only from Allah; to follow one who cannot guide unless guided is a failure of judgment.",
        "beforeThisAyah": "Only Allah was said to originate and repeat creation; now guidance to the truth is shown to be His alone.",
        "afterThisAyah": "Most of them follow only conjecture; conjecture avails nothing against the truth.",
    },
    36: {
        "tafsirSummary": "Most of them follow nothing but conjecture (ẓann). Conjecture does not avail against the truth at all. Allah is aware of what they do. Their judgment is not based on revelation or evidence but on guesswork—which cannot replace the truth.",
        "lessonReflection": "Following conjecture when the truth has come is to choose ignorance; Allah knows every deed.",
        "beforeThisAyah": "Allah alone was said to guide to the truth; now the state of most people—following conjecture—is described.",
        "afterThisAyah": "The Qur'an could not have been invented by other than Allah; it confirms what is before it and is a detailed Scripture.",
    },
    37: {
        "tafsirSummary": "This Qur'an could not have been produced by other than Allah; it is a confirmation of what was before it and a detailed exposition of the Book—there is no doubt in it—from the Lord of the worlds. Its source, consistency with earlier revelation, and clarity are all evidence of divine origin.",
        "lessonReflection": "The Qur'an's coherence with earlier scriptures and its detail point to a single divine source—not human invention.",
        "beforeThisAyah": "Most were said to follow conjecture; now the Qur'an is affirmed as from Allah and as confirming and detailing the Book.",
        "afterThisAyah": "If they say he invented it, let them produce a surah like it and call on whoever they can besides Allah.",
    },
    38: {
        "tafsirSummary": "Do they say he invented it? Say: then bring a surah like it and call on whoever you can besides Allah if you are truthful. The challenge (taḥaddī) is to produce something of the same nature—they cannot, so the claim of invention fails.",
        "lessonReflection": "The challenge to produce a surah like it has never been met; the Qur'an stands as proof of its own origin.",
        "beforeThisAyah": "The Qur'an was declared from the Lord of the worlds; now the challenge to the claim of invention is given.",
        "afterThisAyah": "They denied what they did not encompass in knowledge and whose interpretation had not yet come—as did those before them.",
    },
    39: {
        "tafsirSummary": "Rather they denied what they could not encompass in knowledge and whose interpretation (taʾwīl) had not yet come to them. So did those before them deny. So look at how was the end of the wrongdoers. Denial without knowledge and before the outcome is seen leads to the same fate as past wrongdoers.",
        "lessonReflection": "To deny what one does not understand, before its meaning is clear, is to join the fate of the wrongdoers of the past.",
        "beforeThisAyah": "The challenge to produce a surah like it was given; now their denial without knowledge is condemned and the end of wrongdoers is recalled.",
        "afterThisAyah": "Some of them believe in it and some do not; your Lord is most knowing of the corrupters.",
    },
    40: {
        "tafsirSummary": "Among them are those who believe in it and among them those who do not believe. Your Lord is most knowing of the corrupters (mufsidīn). The split in response is real; Allah knows who spreads corruption and who does not.",
        "lessonReflection": "Belief and disbelief divide people; Allah knows the corrupters—we are accountable for which side we choose.",
        "beforeThisAyah": "They were said to deny without knowledge like those before them; now the division between believers and disbelievers is stated.",
        "afterThisAyah": "If they deny you, say: my deeds are mine and your deeds are yours; you are free of what I do and I am free of what you do.",
    },
    41: {
        "tafsirSummary": "If they deny you, say: to me my deeds and to you your deeds; you are free of what I do and I am free of what you do. The messenger is not responsible for their rejection; each soul carries its own burden. This is both a declaration of disassociation and a call to accountability.",
        "lessonReflection": "The messenger delivers the message; he does not carry the burden of those who reject—that is theirs alone.",
        "beforeThisAyah": "Some believe and some do not; your Lord knows the corrupters; now the Prophet is given the response to denial.",
        "afterThisAyah": "Among them are those who listen to you—but can you make the deaf hear if they do not reason?",
    },
    42: {
        "tafsirSummary": "Among them are those who listen to you. But can you make the deaf hear when they do not use reason? The messenger's duty is to convey; he cannot force understanding or belief on those who refuse to reason.",
        "lessonReflection": "Listening is not enough without reason; the messenger cannot open hearts that choose to stay deaf.",
        "beforeThisAyah": "The Prophet was told to disassociate his deeds from theirs; now the limits of his ability to guide are stated.",
        "afterThisAyah": "Among them are those who look at you—but can you guide the blind when they do not see?",
    },
    43: {
        "tafsirSummary": "Among them are those who look at you. But can you guide the blind when they do not see? Physical sight without the will to see the truth is like blindness; guidance requires both the message and the openness to receive it.",
        "lessonReflection": "The messenger is visible to all, but guidance reaches only those who are willing to see—the blind in heart cannot be forced to see.",
        "beforeThisAyah": "The deaf who do not reason were mentioned; now the blind who do not see—the messenger cannot force guidance.",
        "afterThisAyah": "Allah does not wrong people at all; people wrong themselves.",
    },
    44: {
        "tafsirSummary": "Allah does not wrong people in the least; rather it is people who wrong themselves. On the Day of Resurrection no soul will be wronged; each will receive what it earned. The verse removes any excuse that Allah is unjust.",
        "lessonReflection": "Injustice is not from Allah; we wrong ourselves by our choices—the Day will make that plain.",
        "beforeThisAyah": "The limits of the messenger's ability to guide the blind were stated; now the principle of divine justice is stated.",
        "afterThisAyah": "On the Day He gathers them it will seem they tarried but an hour; those who denied the meeting with Allah have lost.",
    },
    45: {
        "tafsirSummary": "On the Day He gathers them it will be as if they had tarried but an hour of the day; they will recognise one another. Those who denied the meeting with Allah and were not guided have lost. Time collapses at the Gathering; the loss of those who denied the meeting is final.",
        "lessonReflection": "The whole of worldly life will feel like an hour; the real loss is to have denied the meeting with Allah and missed guidance.",
        "beforeThisAyah": "Allah was said not to wrong people—people wrong themselves; now the Day of Gathering and the loss of the deniers are described.",
        "afterThisAyah": "Whether We show you part of what We promise them or take you to Ourselves, to Us is their return; Allah is witness over what they do.",
    },
    46: {
        "tafsirSummary": "Whether We show you some of what We promise them or We take you in death, to Us is their return; then Allah is witness over what they do. The Prophet may or may not see the punishment in this life; in either case, the people will return to Allah and He is the witness of their deeds.",
        "lessonReflection": "The messenger may see the promise fulfilled or not; either way, everyone returns to Allah and He witnesses all they did.",
        "beforeThisAyah": "The loss of those who denied the meeting was stated; now the Prophet is told that their return is to Allah whether or not he sees the promise.",
        "afterThisAyah": "Every nation has a messenger; when their messenger comes, judgment between them is with justice.",
    },
    47: {
        "tafsirSummary": "For every nation there is a messenger. When their messenger comes, it is judged between them with justice and they are not wronged. Universal prophethood and just judgment are stated—no nation is left without a warner, and the judgment is fair.",
        "lessonReflection": "No nation is without a messenger; when he comes, the judgment is just—so the rejection of the messenger is without excuse.",
        "beforeThisAyah": "The return of all to Allah and His witnessing were stated; now the principle that every nation has a messenger is given.",
        "afterThisAyah": "They say: when is this promise, if you are truthful?",
    },
    48: {
        "tafsirSummary": "They say: when is this promise, if you are truthful? The demand for the timing of the promise (the Hour or punishment) is a recurring challenge; the next verse gives the Prophet the answer—he has no power over the term.",
        "lessonReflection": "Demanding when the promise will be fulfilled ignores that its timing is with Allah, not with the messenger.",
        "beforeThisAyah": "Every nation was said to have a messenger and to be judged justly; now their demand for the timing of the promise is reported.",
        "afterThisAyah": "The Prophet is told to say he has no power over harm or benefit except as Allah wills; every nation has a term.",
    },
    49: {
        "tafsirSummary": "Say: I have no power over harm or benefit for myself except what Allah wills. For every nation there is a term; when their term comes they will not delay or advance an hour. The Prophet does not control the timing of punishment or death; each community has an appointed term.",
        "lessonReflection": "The messenger does not control the term; his role is to convey—the when is with Allah alone.",
        "beforeThisAyah": "They asked when the promise would be; now the Prophet is given the response: the term is with Allah.",
        "afterThisAyah": "Say: if His punishment came by night or day, which part would the guilty seek to hasten?",
    },
    50: {
        "tafsirSummary": "Say: have you considered—if His punishment comes upon you by night or by day, what part of it would the guilty seek to hasten? The question exposes the absurdity of demanding the promise: when it comes there is no escaping it, so why rush toward it?",
        "lessonReflection": "To demand the punishment is to hasten what one cannot control; when it comes, there is no reprieve.",
        "beforeThisAyah": "The Prophet said he has no power over the term; now he is told to ask what part of the punishment they would hasten.",
        "afterThisAyah": "Then will they believe when it comes? But they used to ask for it to be hastened.",
    },
    51: {
        "tafsirSummary": "Then will they believe when it comes? But they used to ask for it to be hastened. When the punishment actually arrives, belief then is of no avail; they had already been asking for it to be hastened in mockery—so the timing is not in their favour.",
        "lessonReflection": "Belief at the moment of punishment is too late; those who mocked by asking for it to be hastened will get what they asked for.",
        "beforeThisAyah": "The Prophet was told to ask what part of the punishment the guilty would hasten; now the futility of believing only when it comes is stated.",
        "afterThisAyah": "It will be said to those who wronged: taste the lasting punishment—are you recompensed except for what you earned?",
    },
    52: {
        "tafsirSummary": "Then it will be said to those who did wrong: taste the lasting punishment—are you recompensed except for what you used to earn? The punishment is lasting and is the direct recompense for their earnings; there is no injustice.",
        "lessonReflection": "The punishment is lasting and is exactly what they earned; the recompense is just.",
        "beforeThisAyah": "The futility of believing only when punishment comes was stated; now the address to the wrongdoers in the punishment is given.",
        "afterThisAyah": "They ask: is it real? Say: yes, by my Lord, it is real; you cannot frustrate it.",
    },
    53: {
        "tafsirSummary": "They ask you: is it real? Say: yes, by my Lord, it is real, and you cannot frustrate it. Every soul that wronged would then have all that is on earth as ransom. The reality of the punishment is affirmed by the Lord; no soul can buy its way out.",
        "lessonReflection": "The punishment is real and cannot be averted; when it comes, no ransom will be accepted.",
        "beforeThisAyah": "The wrongdoers were told to taste the lasting punishment; now the reality of the punishment is affirmed.",
        "afterThisAyah": "The surah turns to the story of Noah and the prophets.",
    },
    54: {
        "tafsirSummary": "If every soul that wronged had all that is on earth, it would offer it as ransom. They will hide their remorse when they see the punishment; it will be judged between them with justice and they will not be wronged. Ransom is refused; remorse is too late; judgment is just.",
        "lessonReflection": "When the punishment is seen, remorse is useless and ransom is refused; justice is done.",
        "beforeThisAyah": "The reality of the punishment was affirmed; now the impossibility of ransom and the just judgment are stated.",
        "afterThisAyah": "To Allah belongs all that is in the heavens and the earth; His promise is true—but most do not know.",
    },
    55: {
        "tafsirSummary": "To Allah belongs all that is in the heavens and the earth. The promise of Allah is true—but most of them do not know. Everything is His; His promise of resurrection and recompense is true; the ignorance of most does not change that.",
        "lessonReflection": "All creation belongs to Allah and His promise is truth; that most people do not know does not alter the fact.",
        "beforeThisAyah": "Ransom and remorse were described; now the dominion of Allah and the truth of His promise are stated.",
        "afterThisAyah": "He gives life and causes death, and to Him you will be returned.",
    },
    56: {
        "tafsirSummary": "He gives life and causes death, and to Him you will be returned. Life, death, and return are in Allah's hand alone—the basis of tawhīd and accountability.",
        "lessonReflection": "Life, death, and return are all with Him; to acknowledge that is to acknowledge the basis of faith.",
        "beforeThisAyah": "All that is in the heavens and earth was said to belong to Allah and His promise to be true; now life, death, and return are stated.",
        "afterThisAyah": "O mankind, there has come to you an exhortation from your Lord and a cure for what is in the breasts.",
    },
    57: {
        "tafsirSummary": "O mankind, there has come to you an exhortation (mawʿiẓa) from your Lord, and a cure for what is in the breasts, and guidance and mercy for the believers. The Qur'an is counsel, healing, guidance, and mercy—each dimension addresses a need.",
        "lessonReflection": "The Qur'an is exhortation, cure, guidance, and mercy; the heart that receives it finds healing and direction.",
        "beforeThisAyah": "Life, death, and return were stated; now the Qur'an is presented as exhortation, cure, and mercy.",
        "afterThisAyah": "Say: in the bounty of Allah and in His mercy—in that let them rejoice.",
    },
    58: {
        "tafsirSummary": "Say: in the bounty of Allah and in His mercy—in that let them rejoice. It is better than what they accumulate. The believers are told to rejoice in Allah's bounty and mercy rather than in worldly gain.",
        "lessonReflection": "Rejoicing in Allah's bounty and mercy is greater than rejoicing in what we pile up of the world.",
        "beforeThisAyah": "The Qur'an was described as exhortation, cure, and mercy; now the believers are told to rejoice in Allah's bounty and mercy.",
        "afterThisAyah": "Say: have you considered the provision Allah has sent down? You have made some of it unlawful and some lawful.",
    },
    59: {
        "tafsirSummary": "Say: have you considered the provision Allah has sent down, of which you have made some unlawful and some lawful? Say: has Allah permitted you, or do you invent against Allah? The question exposes the practice of declaring lawful and unlawful without revelation—inventing against Allah.",
        "lessonReflection": "To make things lawful or unlawful without Allah's permission is to invent against Him; provision is His to regulate.",
        "beforeThisAyah": "Rejoicing in Allah's bounty was urged; now the practice of declaring things lawful or unlawful without authority is questioned.",
        "afterThisAyah": "What will those who invent lies about Allah think on the Day of Resurrection? Allah is bountiful to people but most do not thank.",
    },
    60: {
        "tafsirSummary": "What will those who invent a lie about Allah think on the Day of Resurrection? Allah is bountiful to people, but most of them do not thank. The inventors of falsehood will face the Day; meanwhile Allah's bounty is widespread, yet gratitude is rare.",
        "lessonReflection": "Inventing lies about Allah will be answered on the Day; His bounty is constant, but thankfulness is not.",
        "beforeThisAyah": "Making lawful and unlawful without permission was questioned; now the fate of those who invent lies about Allah and the lack of thankfulness are stated.",
        "afterThisAyah": "The Prophet is told he is not in any occupation nor reciting any scripture nor doing any deed except that We are witness over you.",
    },
    61: {
        "tafsirSummary": "You are not in any occupation (shughul) nor do you recite any part of the Qur'an nor do you do any deed except that We are witness over you when you are engaged in it. Not a single secret is hidden from your Lord on earth or in heaven. Allah's omniscience covers the messenger and all creation.",
        "lessonReflection": "Nothing the messenger or any soul does is hidden from Allah; He is witness over all.",
        "beforeThisAyah": "The inventors of lies and the lack of thankfulness were mentioned; now the Prophet is told that Allah is witness over all he does.",
        "afterThisAyah": "The friends of the Messenger have no fear nor do they grieve—those who believed and were God-fearing.",
    },
    62: {
        "tafsirSummary": "Behold, the friends of Allah (awliyāʾ Allāh)—no fear is upon them nor do they grieve. Those who believed and were God-fearing—for them are good tidings in the life of this world and in the Hereafter. The words of Allah do not change; that is the great triumph. The true friends are the believers who fear Him; their reward is in both worlds.",
        "lessonReflection": "The friends of Allah are the believers who fear Him; they have no fear or grief and receive good tidings in both worlds.",
        "beforeThisAyah": "Allah was said to be witness over the Prophet and all deeds; now His true friends—the believing, God-fearing—are described.",
        "afterThisAyah": "The Prophet is told not to let their speech grieve him; might and honour belong entirely to Allah.",
    },
    63: {
        "tafsirSummary": "Let their speech not grieve you. Might and honour belong entirely to Allah; He is the Hearing, the Knowing. The Prophet is comforted: the rejecters' words do not diminish his Lord's might and honour; Allah hears and knows everything.",
        "lessonReflection": "Grief over the words of the rejecters is unnecessary—might and honour are Allah's; He hears and knows.",
        "beforeThisAyah": "The friends of Allah were described; now the Prophet is told not to be grieved by the speech of the rejecters.",
        "afterThisAyah": "To Allah belongs whoever is in the heavens and whoever is on the earth.",
    },
    64: {
        "tafsirSummary": "To Allah belongs whoever is in the heavens and whoever is on the earth. Those who call upon others besides Allah do not follow partners—they follow only conjecture and they only guess. All creation belongs to Allah; the idolaters follow no real partners, only assumption.",
        "lessonReflection": "Everyone in the heavens and earth belongs to Allah; those who call on others follow only conjecture.",
        "beforeThisAyah": "The Prophet was told not to grieve; might and honour are Allah's; now all in the heavens and earth are declared His.",
        "afterThisAyah": "Allah made the night for you to rest in and the day for sight—signs for people who hear.",
    },
    65: {
        "tafsirSummary": "Allah made the night for you to rest in and the day for sight. Indeed in that are signs for people who hear. The alternation of night and day is both a mercy and a sign for those who listen and reflect.",
        "lessonReflection": "Night and day are mercy and evidence; those who hear with the heart find in them signs of the One who made them.",
        "beforeThisAyah": "All in the heavens and earth were said to belong to Allah; now night and day are given as signs.",
        "afterThisAyah": "They say Allah has taken a son—He is exalted; He is the Self-Sufficient.",
    },
    66: {
        "tafsirSummary": "To Allah belongs whoever is in the heavens and whoever is on the earth. Those who call on others besides Allah do not follow partners—they follow only conjecture and only guess. The so-called partners have no real existence; the idolaters follow mere assumption.",
        "lessonReflection": "There are no real partners; the idolaters follow only conjecture and guesswork—all belongs to Allah.",
        "beforeThisAyah": "Allah was said to be Hearing and Knowing; might and honour His; now all in the heavens and earth are again declared His.",
        "afterThisAyah": "He made the night for rest and the day for sight—signs for people who hear.",
    },
    67: {
        "tafsirSummary": "He it is who made for you the night to rest in and the day to see. Indeed in that are signs for people who hear. The rhythm of night and day is a mercy and a sign for those who listen to the message of creation.",
        "lessonReflection": "Night for rest and day for sight are signs for those who hear—creation speaks to the attentive.",
        "beforeThisAyah": "The idolaters were said to follow only conjecture; now the night and day are again presented as signs.",
        "afterThisAyah": "They say Allah has taken a son; He is exalted—He is the Self-Sufficient.",
    },
    68: {
        "tafsirSummary": "They say Allah has taken a son. Exalted is He; He is the Self-Sufficient (al-ghanī). To Him belongs whatever is in the heavens and whatever is on the earth. You have no authority for this; do you say about Allah what you do not know? The claim of a son is false; Allah has no need and no partner.",
        "lessonReflection": "Allah is above the need for a son; to ascribe offspring to Him is to speak about Him without knowledge.",
        "beforeThisAyah": "Night and day were given as signs; now the false claim that Allah has a son is refuted.",
        "afterThisAyah": "Say: those who invent falsehood about Allah will not succeed.",
    },
    69: {
        "tafsirSummary": "Say: those who invent falsehood about Allah will not succeed. They have brief enjoyment in this world, then to Us is their return, then We make them taste the severe punishment for their disbelief. Fabricating against Allah leads to brief enjoyment then severe punishment.",
        "lessonReflection": "Inventing falsehood about Allah may bring temporary gain, but it leads to failure and severe punishment.",
        "beforeThisAyah": "The claim of a son was refuted; now the Prophet is told to say that those who invent falsehood about Allah will not succeed.",
        "afterThisAyah": "Recite to them the story of Noah.",
    },
    70: {
        "tafsirSummary": "For them is brief enjoyment (matāʿ) in the world; then to Us is their return; then We make them taste the severe punishment because they disbelieved. The structure is clear: a short stay, then return, then punishment for their denial.",
        "lessonReflection": "Worldly enjoyment for the deniers is brief; return and severe punishment are certain.",
        "beforeThisAyah": "Those who invent falsehood were said not to succeed; now their brief enjoyment and then punishment are stated.",
        "afterThisAyah": "The story of Noah and his people is recounted.",
    },
    71: {
        "tafsirSummary": "Recite to them the story of Noah when he said to his people: O my people, if my presence and my reminding you of the signs of Allah are burdensome to you—I have put my trust in Allah. So resolve your plan and your partners, then let your plan not be obscure to you, then carry it out against me and give me no respite. Noah relies on Allah and challenges them to do their worst.",
        "lessonReflection": "Noah's trust in Allah and his fearless challenge to his people are a model for every caller to the truth.",
        "beforeThisAyah": "The punishment of those who invent falsehood was stated; now the story of Noah begins.",
        "afterThisAyah": "If you turn away, I asked you no reward; my reward is only from Allah and I am commanded to be among the Muslims.",
    },
    72: {
        "tafsirSummary": "If you turn away, I asked you no reward; my reward is only from Allah, and I have been commanded to be among the Muslims. Noah seeks no wage from them; his reward is with Allah and his duty is to submit.",
        "lessonReflection": "The messenger seeks no worldly reward; his reward is from Allah and his command is to submit.",
        "beforeThisAyah": "Noah challenged his people and put his trust in Allah; now he declares he seeks no reward from them.",
        "afterThisAyah": "They denied him; We saved him and those with him in the ship and made them successors; We drowned those who denied Our signs.",
    },
    73: {
        "tafsirSummary": "They denied him, so We saved him and those with him in the ship and made them successors (khalāʾif), and We drowned those who denied Our signs. So see how was the end of those who were warned. Salvation for the believers, destruction for the deniers—the pattern is clear.",
        "lessonReflection": "Noah and the believers were saved; the deniers were drowned; the end of those who were warned is a lesson for all.",
        "beforeThisAyah": "Noah said his reward is from Allah; now the denial, the salvation in the ship, and the drowning of the deniers are related.",
        "afterThisAyah": "Then We sent after him messengers to their peoples with clear proofs; they did not believe in what they had denied before.",
    },
    74: {
        "tafsirSummary": "Then We sent after him messengers to their peoples; they came with clear proofs but they would not believe in what they had denied before. Thus We seal the hearts of the transgressors. Persistence in denial after clear proofs leads to the sealing of the heart.",
        "lessonReflection": "To deny again after clear proofs is to risk the sealing of the heart—the same pattern repeats.",
        "beforeThisAyah": "Noah's people were drowned and the end of the warned was shown; now the messengers after him and the sealing of hearts are stated.",
        "afterThisAyah": "Then We sent Moses and Aaron to Pharaoh and his chiefs with Our signs; they were arrogant and were a sinful people.",
    },
    75: {
        "tafsirSummary": "Then We sent after them Moses and Aaron to Pharaoh and his chiefs with Our signs, but they were arrogant (istakbarū) and were a sinful people. Arrogance and sin combined when they faced the clear signs.",
        "lessonReflection": "Moses and Aaron came with signs; Pharaoh and his people responded with arrogance and sin.",
        "beforeThisAyah": "The messengers after Noah and the sealing of hearts were described; now Moses and Aaron are sent to Pharaoh.",
        "afterThisAyah": "When the truth came to them from Us they said: this is clear magic.",
    },
    76: {
        "tafsirSummary": "When the truth came to them from Us they said: this is clear magic. The same response as with the Qur'an—dismissing the truth as magic when it does not suit them.",
        "lessonReflection": "Calling the truth magic is the repeated response of those who refuse to submit.",
        "beforeThisAyah": "Pharaoh and his people were arrogant and sinful; when the truth came they called it magic.",
        "afterThisAyah": "Moses said: do you say this about the truth when it has come to you? Is this magic? The magicians do not succeed.",
    },
    77: {
        "tafsirSummary": "Moses said: do you say this about the truth when it has come to you? Is this magic? The magicians will not succeed. Moses turns their accusation back: the truth is truth; magic is false and magicians do not succeed.",
        "lessonReflection": "The truth is not magic; to call it so is to confuse the two—and magicians do not succeed.",
        "beforeThisAyah": "They called the truth magic; Moses responds that the truth is truth and magicians do not succeed.",
        "afterThisAyah": "They said: have you come to turn us from what we found our fathers upon, and that greatness might be yours in the land?",
    },
    78: {
        "tafsirSummary": "They said: have you come to us to turn us away from what we found our fathers upon, and that the two of you might have greatness in the land? We do not believe you. The argument of following the fathers and the charge of seeking power—both are rejected.",
        "lessonReflection": "Attachment to the ways of the fathers and the accusation of seeking power are the classic excuses of the rejecters.",
        "beforeThisAyah": "Moses defended the truth; they respond with the argument of the fathers and denial.",
        "afterThisAyah": "Pharaoh said: bring me every skilled magician.",
    },
    79: {
        "tafsirSummary": "Pharaoh said: bring me every skilled magician. He seeks to match the signs with magic—the contest between Moses and the magicians follows in the full story elsewhere; here the focus is on the rejection and its outcome.",
        "lessonReflection": "Pharaoh's response is to summon magicians—to oppose the truth with illusion.",
        "beforeThisAyah": "They accused Moses of seeking to turn them from their fathers' way; Pharaoh demands magicians.",
        "afterThisAyah": "When the magicians came, Moses said: cast what you will cast.",
    },
    80: {
        "tafsirSummary": "When the magicians came Moses said to them: cast what you are going to cast. The challenge is direct; the outcome—the magicians' staffs and ropes appearing to swallow, then Moses' staff swallowing what they fabricated—is known from other surahs. Here the theme is the confrontation.",
        "lessonReflection": "The messenger confronts the illusion with the truth; the truth prevails.",
        "beforeThisAyah": "Pharaoh brought the magicians; Moses invites them to cast what they will.",
        "afterThisAyah": "When Moses had cast, he said: what you have brought is magic; Allah will bring it to naught.",
    },
    81: {
        "tafsirSummary": "When Moses had cast, he said: what you have brought is magic; Allah will invalidate it; Allah does not set right the work of the corrupters. The magicians' act is declared magic and Allah will nullify it; He does not support the work of those who spread corruption.",
        "lessonReflection": "Allah invalidates the false and does not set right the work of the corrupters.",
        "beforeThisAyah": "The magicians cast; Moses declares it magic and that Allah will invalidate it.",
        "afterThisAyah": "Allah confirms the truth by His words though the guilty dislike it.",
    },
    82: {
        "tafsirSummary": "Allah confirms the truth by His words though the guilty dislike it. The truth is established by Allah's word regardless of the rejecters' displeasure.",
        "lessonReflection": "The truth is established by Allah; the displeasure of the guilty does not change it.",
        "beforeThisAyah": "Allah was said to invalidate the magic and not to set right the work of the corrupters; now He confirms the truth by His words.",
        "afterThisAyah": "None believed in Moses except offspring of his people, for fear of Pharaoh and his chiefs.",
    },
    83: {
        "tafsirSummary": "None believed in Moses except a seed of his people, for fear of Pharaoh and his chiefs, lest he persecute them. Pharaoh was indeed mighty on earth and one of the wanton. Fear of the tyrant kept many from declaring belief; only a few had the courage.",
        "lessonReflection": "Belief under tyranny requires courage; many stayed silent for fear of Pharaoh.",
        "beforeThisAyah": "Allah confirms the truth by His words; now the few who believed in Moses despite fear of Pharaoh are mentioned.",
        "afterThisAyah": "Moses said: O my people, if you believe in Allah then put your trust in Him, if you are Muslims.",
    },
    84: {
        "tafsirSummary": "Moses said: O my people, if you have believed in Allah then put your trust in Him, if you are Muslims. They said: in Allah we put our trust. Our Lord, do not make us a trial for the wrongdoing people, and save us by Your mercy from the disbelieving people. The believers put their trust in Allah and ask not to be made a trial and to be saved from the wrongdoers.",
        "lessonReflection": "Trust in Allah and the prayer not to be made a trial are the response of the believing community under oppression.",
        "beforeThisAyah": "Only a few believed for fear of Pharaoh; Moses calls them to put their trust in Allah.",
        "afterThisAyah": "We revealed to Moses and his brother: appoint for your people houses in Egypt and make your houses a direction for prayer.",
    },
    85: {
        "tafsirSummary": "We revealed to Moses and his brother: provide houses for your people in Egypt and make your houses a qibla and establish prayer. Give good tidings to the believers. The believers are given a place and a direction—establishing worship and community under persecution.",
        "lessonReflection": "Houses as places of safety and prayer and the establishment of worship are the response to oppression.",
        "beforeThisAyah": "Moses and the believers put their trust in Allah and prayed for deliverance; now they are told to establish houses and prayer.",
        "afterThisAyah": "Moses said: our Lord, You have given Pharaoh and his chiefs adornment and wealth in the life of this world.",
    },
    86: {
        "tafsirSummary": "Moses said: our Lord, You have given Pharaoh and his chiefs adornment and wealth in the life of this world—our Lord, that they may lead people astray from Your path. Our Lord, destroy their wealth and harden their hearts so they do not believe until they see the painful punishment. Moses prays against the oppressors' means of misguidance and for their hearts to be hardened until they see the punishment.",
        "lessonReflection": "The prophet prays against the wealth and influence that lead people astray and for the exposure of the stubborn until they see the punishment.",
        "beforeThisAyah": "Houses and prayer were commanded; Moses now prays against Pharaoh's adornment and for the exposure of the stubborn.",
        "afterThisAyah": "Allah said: your prayer is answered; so go straight and do not follow the path of those who do not know.",
    },
    87: {
        "tafsirSummary": "Allah said: your supplication is answered; so go straight and do not follow the path of those who do not know. The prayer is accepted; the command is to remain on the straight path and not imitate the ignorant.",
        "lessonReflection": "When the prayer is answered, the response is to hold to the straight path and avoid the way of the ignorant.",
        "beforeThisAyah": "Moses prayed against Pharaoh's means of misguidance; Allah answers and commands steadfastness.",
        "afterThisAyah": "We brought the Children of Israel across the sea; Pharaoh and his hosts pursued them in rebellion and hostility.",
    },
    88: {
        "tafsirSummary": "We brought the Children of Israel across the sea; Pharaoh and his hosts pursued them in rebellion (baghy) and enmity until, when drowning overtook him, he said: I believe that there is no god but He in whom the Children of Israel believe, and I am among the Muslims. Now? When he saw the punishment he claimed belief—but it was too late.",
        "lessonReflection": "Pharaoh's belief at the moment of drowning was not accepted; belief under compulsion at the end is not the same as belief when the choice was open.",
        "beforeThisAyah": "Allah answered Moses and told him to go straight; now the crossing of the sea and Pharaoh's pursuit and drowning are related.",
        "afterThisAyah": "Now? And you had disobeyed before and were among the corrupters.",
    },
    89: {
        "tafsirSummary": "Now? And you had disobeyed before and were among the corrupters. So today We save you in your body that you may be a sign to those after you—and indeed many among the people are heedless of Our signs. Pharaoh's body is saved as a sign; his late profession is rejected.",
        "lessonReflection": "Belief at the last moment after a life of rebellion is rejected; his body is preserved as a sign for later generations.",
        "beforeThisAyah": "Pharaoh claimed belief when drowning; Allah rejects it—he had disobeyed and been among the corrupters.",
        "afterThisAyah": "We settled the Children of Israel in a good settlement and provided them good things; they did not differ until knowledge came to them.",
    },
    90: {
        "tafsirSummary": "We brought the Children of Israel across the sea. Pharaoh and his hosts pursued them in rebellion and enmity until, when the drowning overtook him, he said: I believe that there is no god but He in whom the Children of Israel believe, and I am of the Muslims. The moment of desperation produces the words he had refused before.",
        "lessonReflection": "When the sea closed over him, Pharaoh said what he had denied—but the acceptance of faith is with Allah, and the time had passed.",
        "beforeThisAyah": "The crossing and pursuit were stated; now Pharaoh's words when drowning are given.",
        "afterThisAyah": "Allah says: now? When you had disobeyed before and were among the corrupters.",
    },
    91: {
        "tafsirSummary": "Now? And you had disobeyed before and were among the corrupters. So today We save you in your body that you may be a sign to those after you—and indeed many of the people are heedless of Our signs. His body is preserved as a sign; his late profession does not save him.",
        "lessonReflection": "The body is saved as a sign; the soul faces the consequence of a lifetime of rebellion.",
        "beforeThisAyah": "Pharaoh said he believed when drowning; Allah responds: now? After your past disobedience.",
        "afterThisAyah": "We settled the Children of Israel in a good settlement and provided them good things.",
    },
    92: {
        "tafsirSummary": "So today We save you in your body that you may be a sign to those who come after you. And indeed many among the people are heedless of Our signs. Pharaoh's body is preserved—according to tradition, to be seen by later generations—as a sign; heedlessness of signs is widespread.",
        "lessonReflection": "Pharaoh's body becomes a sign for later generations; many remain heedless of such signs.",
        "beforeThisAyah": "Pharaoh's late profession was rejected; his body is saved as a sign.",
        "afterThisAyah": "We settled the Children of Israel in a good settlement and provided them good things; they did not differ until knowledge came.",
    },
    93: {
        "tafsirSummary": "We settled the Children of Israel in a settlement of truth (mubawwaʾ ṣidq) and provided them with good things. They did not differ until knowledge came to them. Your Lord will judge between them on the Day of Resurrection concerning that in which they differed. They were given a good abode and provision; after knowledge came they differed; the judgment is deferred to the Day of Resurrection.",
        "lessonReflection": "The Children of Israel were given a good settlement; their differences after knowledge came will be judged on the Day of Resurrection.",
        "beforeThisAyah": "Pharaoh's body was saved as a sign; now the settlement of the Children of Israel and their subsequent differences are stated.",
        "afterThisAyah": "If you are in doubt about what We have sent down to you, ask those who read the Scripture before you.",
    },
    94: {
        "tafsirSummary": "If you are in doubt about what We have sent down to you, ask those who read the Scripture before you. The truth has come to you from your Lord, so do not be among the doubters. The Prophet is told that if he had any doubt—though he did not—he could ask the People of the Book; the truth is from his Lord and he must not doubt.",
        "lessonReflection": "The truth has come from the Lord; doubt is removed by the evidence and by the testimony of the earlier Scriptures.",
        "beforeThisAyah": "The Children of Israel and their differences were mentioned; now the Prophet is told the truth has come and not to doubt.",
        "afterThisAyah": "And do not be among those who deny the signs of Allah, lest you be among the losers.",
    },
    95: {
        "tafsirSummary": "And do not be among those who deny the signs of Allah, so that you become among the losers. The warning is direct: denying the signs leads to loss. The Prophet and the believers are urged to hold fast to the signs.",
        "lessonReflection": "To deny the signs of Allah is to choose loss; the believer holds fast to them.",
        "beforeThisAyah": "The Prophet was told the truth has come and not to doubt; now he is warned not to deny the signs.",
        "afterThisAyah": "Those upon whom the word of your Lord has been fulfilled will not believe.",
    },
    96: {
        "tafsirSummary": "Those upon whom the word of your Lord has been fulfilled will not believe—even if every sign came to them—until they see the painful punishment. For some, the heart is sealed; they will not believe until they see the punishment, and then it is too late.",
        "lessonReflection": "When the word of the Lord is fulfilled against someone, no sign will avail until they see the punishment.",
        "beforeThisAyah": "The Prophet was warned not to deny the signs; now those upon whom the word has been fulfilled are described.",
        "afterThisAyah": "Why was there no town that believed and was helped by its belief except the people of Jonah?",
    },
    97: {
        "tafsirSummary": "Even if every sign came to them, they would not believe until they see the painful punishment. The sealing is so complete that only the sight of the punishment would affect them—and then belief would be of no avail.",
        "lessonReflection": "For those upon whom the word is fulfilled, signs no longer open the heart; only the punishment will be seen.",
        "beforeThisAyah": "Those upon whom the word was fulfilled were said not to believe; now the extent of their closure is stated.",
        "afterThisAyah": "The people of Jonah believed and We removed from them the punishment of disgrace in the world and gave them enjoyment for a time.",
    },
    98: {
        "tafsirSummary": "Was there any town that believed and its belief benefited it except the people of Jonah? When they believed We removed from them the punishment of disgrace in the worldly life and gave them enjoyment for a time. The people of Jonah (Yūnus) are the exception—they believed and were spared; their story is a sign of the power of collective repentance.",
        "lessonReflection": "The people of Jonah show that when a people believe, Allah can remove punishment and grant relief—repentance is never in vain.",
        "beforeThisAyah": "Those who would not believe until they see the punishment were described; now the exception—the people of Jonah who believed—is given.",
        "afterThisAyah": "If your Lord had willed, everyone on earth would have believed. Will you then compel people until they are believers?",
    },
    99: {
        "tafsirSummary": "If your Lord had willed, everyone on earth would have believed, all of them. Will you then compel the people until they are believers? Belief is by Allah's will and human choice; the Prophet cannot and must not compel anyone—guidance is from Allah.",
        "lessonReflection": "Belief is not compelled; the Prophet's role is to convey, not to force—Allah could have made all believe but has given choice.",
        "beforeThisAyah": "The people of Jonah believed and were spared; now the principle that belief cannot be compelled is stated.",
        "afterThisAyah": "It is not for any soul to believe except by the permission of Allah.",
    },
    100: {
        "tafsirSummary": "It is not for a soul to believe except by the permission of Allah. And He lays defilement (rijs) upon those who do not use reason. Belief is by Allah's leave; those who refuse to reason are left in defilement.",
        "lessonReflection": "Belief is a gift from Allah; the one who refuses to use reason is left in spiritual defilement.",
        "beforeThisAyah": "The Prophet was told he cannot compel belief; now belief is said to be only by Allah's permission.",
        "afterThisAyah": "Say: look at what is in the heavens and the earth.",
    },
    101: {
        "tafsirSummary": "Say: look at what is in the heavens and the earth. But signs and warners do not avail a people who do not believe. The creation is there to be observed; for those who refuse to believe, no sign or warner will avail.",
        "lessonReflection": "The heavens and the earth are full of signs; for those who will not believe, signs and warners are of no avail.",
        "beforeThisAyah": "Belief was said to be by Allah's permission; now the addressees are told to look at creation—but signs do not avail the disbelievers.",
        "afterThisAyah": "Do they wait for anything but the like of the days of those who passed before them? Say: wait, I am with you among those who wait.",
    },
    102: {
        "tafsirSummary": "Do they wait for anything but the like of what happened to those who passed away before them? Say: then wait; I am with you among those who wait. The fate of the past is the pattern for the future; the Prophet waits with them for the decree of Allah.",
        "lessonReflection": "What came upon the past nations can come again; the messenger waits with the people for Allah's decree.",
        "beforeThisAyah": "Signs and warners were said not to avail the disbelievers; now they are told to expect the like of the days of the past.",
        "afterThisAyah": "Then We save Our messengers and those who believe; so it is incumbent upon Us to save the believers.",
    },
    103: {
        "tafsirSummary": "Then We save Our messengers and those who believe. Thus it is incumbent upon Us to save the believers. The promise is explicit: Allah will save the messengers and the believers—it is a duty He has taken upon Himself.",
        "lessonReflection": "The salvation of the messengers and the believers is a promise and an obligation on Allah—the believers can take heart.",
        "beforeThisAyah": "The Prophet was told to wait with them; now the promise to save the messengers and the believers is stated.",
        "afterThisAyah": "Say: O people, if you are in doubt about my religion—I do not worship those you worship besides Allah.",
    },
    104: {
        "tafsirSummary": "Say: O people, if you are in doubt about my religion—I do not worship those you worship besides Allah, but I worship Allah who takes your souls, and I am commanded to be among the believers. The Prophet's worship is for Allah alone, who holds life and death; he is commanded to believe.",
        "lessonReflection": "The Prophet's religion is clear: worship of Allah alone, who takes the souls, and obedience to the command to believe.",
        "beforeThisAyah": "The salvation of the messengers and believers was promised; now the Prophet is given a clear declaration of his religion.",
        "afterThisAyah": "Set your face to the religion as a ḥanīf and do not be among the associators.",
    },
    105: {
        "tafsirSummary": "And: set your face to the religion as a ḥanīf (inclining to truth), and do not be among the associators. The command is to direct the face—the whole orientation—to the religion in sincerity and to avoid shirk.",
        "lessonReflection": "To set one's face to the religion as a ḥanīf is to worship Allah alone in sincerity and to shun association.",
        "beforeThisAyah": "The Prophet declared he worships Allah who takes the souls; now he is commanded to set his face to the religion as a ḥanīf.",
        "afterThisAyah": "Do not call upon besides Allah what neither benefits you nor harms you.",
    },
    106: {
        "tafsirSummary": "And do not call upon besides Allah what neither benefits you nor harms you; for if you did you would then be among the wrongdoers. To invoke what has no power over benefit or harm is futile and wrong; the wrongdoer is the one who associates such with Allah.",
        "lessonReflection": "Invoking what can neither benefit nor harm is futile and places one among the wrongdoers.",
        "beforeThisAyah": "The Prophet was commanded to set his face to the religion as a ḥanīf; now he is told not to invoke others besides Allah.",
        "afterThisAyah": "If Allah touches you with harm, none can remove it but He; if He desires good for you, none can repel His bounty.",
    },
    107: {
        "tafsirSummary": "If Allah touches you with harm, none can remove it but He; and if He desires good for you, none can repel His bounty. He gives it to whom He will of His servants. He is the Forgiving, the Merciful. All harm and good are in His hand; He is the only one who can remove harm or bestow good; He is Forgiving and Merciful.",
        "lessonReflection": "Harm and good are with Allah alone; to turn to Him for relief and for bounty is to turn to the only one who can give them.",
        "beforeThisAyah": "The Prophet was told not to invoke what neither benefits nor harms; now harm and good are said to be only from Allah.",
        "afterThisAyah": "Say: O people, the truth has come to you from your Lord; whoever is guided is guided for his soul, whoever goes astray goes astray against it.",
    },
    108: {
        "tafsirSummary": "Say: O people, the truth has come to you from your Lord. Whoever is guided is guided for his own soul, and whoever goes astray goes astray against it. I am not a guardian over you. The message is delivered; guidance and misguidance are for the soul's own account; the Prophet is not responsible for their choice.",
        "lessonReflection": "The truth has come; each soul answers for its own guidance or misguidance; the messenger is not their keeper.",
        "beforeThisAyah": "Allah was said to be the only one who removes harm and gives bounty; now the Prophet is given the final address to the people.",
        "afterThisAyah": "Follow what is revealed to you and be patient until Allah judges; He is the best of judges.",
    },
    109: {
        "tafsirSummary": "Follow what is revealed to you and be patient until Allah judges. He is the best of judges. The closing command: adhere to the revelation and be patient; the judgment belongs to Allah and He is the best of judges. The surah ends with the same themes with which it began—revelation, patience, and the return to Allah.",
        "lessonReflection": "The messenger is to follow the revelation and be patient; the judgment is with Allah, the best of judges.",
        "beforeThisAyah": "The truth was said to have come and each soul to be accountable for its own guidance; now the Prophet is commanded to follow the revelation and be patient.",
        "afterThisAyah": "The surah ends with the command to follow revelation and be patient until Allah judges.",
    },
}

def main():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for i, ayah in enumerate(data["ayahs"]):
        num = ayah["ayahNumber"]
        if num in UPDATES:
            for key, value in UPDATES[num].items():
                ayah[key] = value

    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Updated {len(UPDATES)} ayahs with improved tafsir content.")

if __name__ == "__main__":
    main()
