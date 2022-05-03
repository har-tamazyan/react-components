

export const deConstructRecievedJobSkillsPayload = (skillsPayload) => {
  const skillsGroupIdMap = {};
  skillsPayload.forEach(({
    skill_group_id: groupId, skill, id, ...restOfSkillDetails
  }) => {
    skillsGroupIdMap[groupId] = {
      ...(skillsGroupIdMap[groupId] || restOfSkillDetails),
      skill: [...(skillsGroupIdMap[groupId]?.skill || []), { name: skill, id }],
      skill_group_id: groupId,
    };
  });
  return Object.values(skillsGroupIdMap);
};
