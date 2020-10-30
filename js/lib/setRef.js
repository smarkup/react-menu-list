"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setRef;

function setRef(ref, value) {
  // If a more proper way to compose refs ever happens, then do that here.
  // https://github.com/facebook/react/issues/13029
  if (typeof ref === 'function') {
    ref(value);
  } else {
    /*:: if (typeof ref === 'string' || typeof ref === 'number') throw new Error(); */
    ref.current = value;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2V0UmVmLmpzIl0sIm5hbWVzIjpbInNldFJlZiIsInJlZiIsInZhbHVlIiwiY3VycmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUllLFNBQVNBLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQStCQyxLQUEvQixFQUEyQztBQUN4RDtBQUNBO0FBQ0EsTUFBSSxPQUFPRCxHQUFQLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0JBLElBQUFBLEdBQUcsQ0FBQ0MsS0FBRCxDQUFIO0FBQ0QsR0FGRCxNQUVPO0FBQ0w7QUFDQUQsSUFBQUEsR0FBRyxDQUFDRSxPQUFKLEdBQWNELEtBQWQ7QUFDRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHR5cGUge1JlZn0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRSZWYocmVmOiBSZWY8YW55PiwgdmFsdWU6IGFueSkge1xuICAvLyBJZiBhIG1vcmUgcHJvcGVyIHdheSB0byBjb21wb3NlIHJlZnMgZXZlciBoYXBwZW5zLCB0aGVuIGRvIHRoYXQgaGVyZS5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xMzAyOVxuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlZih2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgLyo6OiBpZiAodHlwZW9mIHJlZiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHJlZiA9PT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcigpOyAqL1xuICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==