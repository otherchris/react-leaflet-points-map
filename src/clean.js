import cloneDeep from 'lodash/cloneDeep';
import uuid from 'uuid';

export const cleanPoint = (point) => {
  const p = cloneDeep(point);

  // Tag with id if not already tagged
  if (!p.properties.key) p.properties.key = uuid.v4();

  return p;
};
